import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseArrayPipe } from '@nestjs/common/pipes';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { User } from '@/common/entities/User.entity';
import { Category } from '@/common/entities/Category.entity';
import UserDto from './dto/user.dto';
import PasswordResetDto from './dto/password-reset.dto';
import PasswordResetRequestDto from './dto/password-reset-request.dto';
import SetProfileImageDto from './dto/set-profile-image.dto';
import AddUserEducationDto from './dto/add-user-education.dto';
import AddUserWorkhistoryDto from './dto/add-user-workhistory.dto';
import { ReqUser } from './dto/get-user-dto.dto';
import AddUserInfoDto from './dto/add-user-info.dto';
import { takeValue, pageNumber } from './constants';
import GetUserWorkhistoryDto from './dto/get-user-workhistory.dto';
import { WorkHistory } from '@/common/entities/WorkHistory.entity';
import GetUserEducationDto from './dto/get-user-education.dto';
import { Education } from '@/common/entities/Education.entity';
import GetFreelancerDto from './dto/get-freelancer-params.dto';
import getUserProposalsResponseDto from './dto/get-proposals-by-user.dto';
import SetFavoritesDto from './dto/set-favorites.dto';
import GetFavoritesDto from './dto/get-favorites.dto';
import SetFreelancerRatingDto from './dto/set-freelancer-rating.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get information about current user' })
  @ApiResponse({ type: UserDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserInformation(@Request() req: ReqUser): UserDto {
    return req.user;
  }

  @ApiOperation({
    summary: 'get information about current user work experience',
  })
  @ApiResponse({ type: GetUserWorkhistoryDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('/workhistory-info')
  getUserWorkInformation(@Request() req: ReqUser): Promise<WorkHistory[]> {
    return this.userService.getWorkInfo(req.user);
  }

  @ApiOperation({
    summary: 'get information about current user education',
  })
  @ApiResponse({ type: GetUserEducationDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('/education-info')
  getUserEducationInformation(@Request() req: ReqUser): Promise<Education[]> {
    return this.userService.getEducationInfo(req.user);
  }

  @ApiOperation({ summary: 'send mail for password reset' })
  @Post('passwordresetrequest')
  @HttpCode(HttpStatus.OK)
  passwordResetRequest(@Body() dto: PasswordResetRequestDto): Promise<void> {
    return this.userService.sendPasswordResetMail(dto);
  }

  @ApiOperation({ summary: "reset user's password" })
  @Post('passwordreset')
  @HttpCode(HttpStatus.OK)
  passwordReset(@Body() dto: PasswordResetDto): Promise<void> {
    return this.userService.resetPassword(dto);
  }

  @ApiOperation({ summary: 'Check reset password link availability' })
  @ApiResponse({ type: Boolean })
  @ApiParam({ name: 'key', description: 'secret key' })
  @Get('/passwordreset/:key')
  passwordResetCheckAvailability(
    @Param() params: { key: string },
  ): Promise<boolean> {
    return this.userService.passwordResetCheckAvailability(params.key);
  }

  @ApiOperation({ summary: 'set profile image for user' })
  @ApiResponse({ type: SetProfileImageDto })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('setprofileimage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.OK)
  setProfileImage(
    @UploadedFile() avatar: Express.Multer.File,
    @Request() req: ReqUser,
  ): Promise<SetProfileImageDto> {
    return this.userService.setProfileImage(avatar, req.user);
  }

  @ApiOperation({ summary: 'sent user information' })
  @ApiHeader(getAuthorizationApiHeader())
  @Put('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addUserInfo(
    @Request() req: ReqUser,
    @Body() payload: AddUserInfoDto,
  ): Promise<void> {
    return this.userService.addUserInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'sent education information' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiBody({ isArray: true, type: AddUserEducationDto })
  @Post('education-info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addEducationInfo(
    @Request() req: ReqUser,
    @Body(new ParseArrayPipe({ items: AddUserEducationDto }))
    payload: AddUserEducationDto[],
  ): Promise<void> {
    return this.userService.addEducationInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'sent workhistory information' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiBody({ isArray: true, type: AddUserWorkhistoryDto })
  @Post('workhistory-info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addWorkhistoryInfo(
    @Request() req: ReqUser,
    @Body(new ParseArrayPipe({ items: AddUserWorkhistoryDto }))
    payload: AddUserWorkhistoryDto[],
  ): Promise<void> {
    return this.userService.addWorkhistoryInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'get full freelancer info by id' })
  @ApiResponse({ type: UserDto })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiParam({ name: 'key', description: 'secret key' })
  @Get('/freelancer/:key')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getFreelancerPageInfoById(@Param() params: { key: number }): Promise<User> {
    return this.userService.getFreelancerInfoById(params.key);
  }

  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({ type: UserDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('/freelancer')
  getFreelancerInformation(
    @Query() params: GetFreelancerDto,
  ): Promise<[User[], number]> {
    return this.userService.getFheelancerInformation(params);
  }

  @ApiOperation({ summary: 'Add new category for user or set category' })
  @ApiHeader(getAuthorizationApiHeader())
  @Post('category')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  addCategoryInfo(
    @Request() req: ReqUser,
    @Body() payload: Category,
  ): Promise<void> {
    return this.userService.addCategoryInfo(payload, req.user);
  }

  @ApiOperation({ summary: 'Get all available categories' })
  @ApiHeader(getAuthorizationApiHeader())
  @Get('category')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getCategories(): Promise<Category[]> {
    return this.userService.getCategoryInfo();
  }

  @ApiOperation({ summary: 'add or delete new favorite' })
  @ApiHeader(getAuthorizationApiHeader())
  @Post('favorites')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  setFavorite(
    @Request() req: ReqUser,
    @Body() payload: SetFavoritesDto,
  ): Promise<void> {
    return this.userService.setFavorite(req.user, payload);
  }

  @ApiOperation({ summary: 'get all favorites' })
  @ApiResponse({ type: GetFavoritesDto })
  @ApiHeader(getAuthorizationApiHeader())
  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getFavorites(@Request() req: ReqUser): Promise<GetFavoritesDto[]> {
    return this.userService.getFavorites(req.user);
  }

  @ApiOperation({
    summary: 'Get proposals by user',
  })
  @ApiResponse({ type: getUserProposalsResponseDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('/proposals')
  getProposalsByUser(
    @Request() req: ReqUser,
  ): Promise<getUserProposalsResponseDto> {
    return this.userService.getProposalsByUser(req.user);
  }

  @ApiOperation({ summary: 'set freelancer rating' })
  @ApiHeader(getAuthorizationApiHeader())
  @Post('/freelancerrating')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  setFreelancerRating(
    @Request() req: ReqUser,
    @Body() payload: SetFreelancerRatingDto,
  ): Promise<void> {
    return this.userService.setFreelancerRating(req.user, payload);
  }
}
