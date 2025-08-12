import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: await bcrypt.hash('password', 10),
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'employee',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        orders: [],
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser('testuser', 'password');

      expect(result).toBeDefined();
      expect(result.username).toBe('testuser');
      expect(result.password).toBeUndefined();
    });

    it('should return null when user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent', 'password');

      expect(result).toBeNull();
    });
  });
});