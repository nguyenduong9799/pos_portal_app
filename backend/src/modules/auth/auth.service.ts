import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { LoginDto, RegisterDto, LoginResponseDto, UserResponseDto, ChangePasswordDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;

    // Find user by username
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      id: user.id.toString(),
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      status: user.isActive ? 'Active' : 'Inactive',
    };
  }

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const { username, email, password, firstName, lastName } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'employee',
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);

    // Generate tokens
    const payload = { username: savedUser.username, sub: savedUser.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      id: savedUser.id.toString(),
      username: savedUser.username,
      name: `${savedUser.firstName} ${savedUser.lastName}`,
      role: savedUser.role,
      status: savedUser.isActive ? 'Active' : 'Inactive',
    };
  }

  async getUserProfile(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id.toString(),
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      status: user.isActive ? 'Active' : 'Inactive',
      storeId: null, // These would come from additional entities in a full implementation
      storeCode: null,
      brandId: null,
      brandCode: null,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken?: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { username: user.username, sub: user.id };
      const newAccessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });

      return {
        token: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.userRepository.update(userId, { password: hashedNewPassword });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not for security
      return;
    }

    // In a real implementation, you would:
    // 1. Generate a reset token
    // 2. Store it in database with expiration
    // 3. Send email with reset link
    console.log(`Password reset requested for: ${email}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // In a real implementation, you would:
    // 1. Verify the reset token
    // 2. Find user by token
    // 3. Update password
    // 4. Invalidate the token
    
    // For now, just throw an error as this would need additional infrastructure
    throw new UnauthorizedException('Password reset not implemented');
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}