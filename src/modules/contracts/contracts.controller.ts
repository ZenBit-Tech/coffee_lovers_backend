import { Controller, UseGuards, Param, Get, Req } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { Contract } from '@/common/entities/Contract.entity';
import { ContractsService } from './contracts.service';
import ContractsResponseDto from './dto/contracts-response.dto';

enum EndpointsRoutes {
  active = 'active',
  closed = 'closed',
}

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @ApiOperation({
    summary: 'Get active contracts',
  })
  @ApiResponse({ type: ContractsResponseDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get(`${EndpointsRoutes.active}`)
  getActiveContractsFreelancer(@Req() req): Promise<Contract[]> {
    return this.contractsService.getActiveContracts(req.user);
  }

  @ApiOperation({
    summary: 'Get closed contracts',
  })
  @ApiResponse({ type: ContractsResponseDto })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get(`${EndpointsRoutes.closed}`)
  getClosedContractsFreelancer(@Req() req): Promise<Contract[]> {
    return this.contractsService.getClosedContracts(req.user);
  }
}
