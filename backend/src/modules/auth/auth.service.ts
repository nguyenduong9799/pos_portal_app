import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities';
import {
  LoginDto,
  RegisterDto,
  LoginResponseDto,
  UserResponseDto,
  ChangePasswordDto,
} from './dto';
import { PasswordUtil } from './utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;

    const user = await this.accountRepository.findOne({
      where: { username },
      relations: ['role'],
    });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'Active') {
      throw new UnauthorizedException('Account is not active');
    }

    const isPasswordValid = PasswordUtil.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken: token,
      refreshToken,
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role?.name || 'user',
      status: user.status,
    };
  }

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const { username, password, firstName, lastName } = registerDto;

    const existingAccount = await this.accountRepository.findOne({
      where: { username },
    });

    if (existingAccount) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = PasswordUtil.hashPassword(password);

    const account = this.accountRepository.create({
      username,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      status: 'Active',
    });

    const savedAccount = await this.accountRepository.save(account);

    const payload = { username: savedAccount.username, sub: savedAccount.id };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken: token,
      refreshToken,
      id: savedAccount.id,
      username: savedAccount.username,
      name: savedAccount.name,
      role: 'user',
      status: savedAccount.status,
    };
  }

  async getProfile(id: string): Promise<UserResponseDto> {
    const user = await this.accountRepository.findOne({
      where: { id },
      relations: [
        'role',
        'storeAccount',
        'storeAccount.store',
        'brandAccount',
        'brandAccount.brand',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role?.name || 'user',
      status: user.status,
      storeId: user.storeAccount?.store?.id || null,
      storeCode: user.storeAccount?.store?.code || null,
      brandId: user.brandAccount?.brand?.id || null,
      brandCode: user.brandAccount?.brand?.brandCode || null,
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ token: string; refreshToken?: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.accountRepository.findOne({
        where: { id: payload.sub },
        relations: ['role'],
      });

      if (!user || user.status !== 'Active') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { username: user.username, sub: user.id };
      const newToken = this.jwtService.sign(newPayload);

      return {
        token: newToken,
        refreshToken: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.accountRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = PasswordUtil.comparePassword(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedNewPassword = PasswordUtil.hashPassword(newPassword);

    await this.accountRepository.update(userId, {
      password: hashedNewPassword,
    });
  }

  forgotPassword(email: string): void {
    // Since Account entity doesn't have email field, this method is not supported
    throw new NotFoundException('Email-based password reset is not supported');
  }

  resetPassword(token: string, newPassword: string): Promise<void> {
    // Since Account entity doesn't have email field, this method is not supported
    throw new NotFoundException('Token-based password reset is not supported');
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.accountRepository.findOne({
      where: { username },
      relations: ['role'],
    });

    if (user && PasswordUtil.comparePassword(password, user.password)) {
      // Exclude password from the result
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
