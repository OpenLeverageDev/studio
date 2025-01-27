import { Inject } from '@nestjs/common';

import { APP_TOOLKIT, IAppToolkit } from '~app-toolkit/app-toolkit.interface';
import { Register } from '~app-toolkit/decorators';
import { getLabelFromToken } from '~app-toolkit/helpers/presentation/image.present';
import { MetaType } from '~position/position.interface';
import { isSupplied } from '~position/position.utils';
import {
  ContractPositionTemplatePositionFetcher,
  DisplayPropsStageParams,
  GetTokenBalancesPerPositionParams,
  TokenStageParams,
} from '~position/template/contract-position.template.position-fetcher';
import { Network } from '~types/network.interface';

import { BALANCER_V2_DEFINITION } from '../balancer-v2.definition';
import { BalancerV2ContractFactory, BalancerVeBal } from '../contracts';

const appId = BALANCER_V2_DEFINITION.id;
const groupId = BALANCER_V2_DEFINITION.groups.votingEscrow.id;
const network = Network.ETHEREUM_MAINNET;

@Register.ContractPositionFetcher({ appId, groupId, network })
export class EthereumBalancerV2VotingEscrowContractPositionFetcher extends ContractPositionTemplatePositionFetcher<BalancerVeBal> {
  appId = BALANCER_V2_DEFINITION.id;
  groupId = BALANCER_V2_DEFINITION.groups.votingEscrow.id;
  network = Network.ETHEREUM_MAINNET;
  groupLabel = 'Voting Escrow';

  constructor(
    @Inject(APP_TOOLKIT) protected readonly appToolkit: IAppToolkit,
    @Inject(BalancerV2ContractFactory) protected readonly contractFactory: BalancerV2ContractFactory,
  ) {
    super(appToolkit);
  }

  getContract(address: string): BalancerVeBal {
    return this.contractFactory.balancerVeBal({ address, network: this.network });
  }

  async getDescriptors() {
    return [{ address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25' }];
  }

  async getTokenDescriptors({ contract }: TokenStageParams<BalancerVeBal>) {
    const tokenAddress = await contract.token();
    return [{ metaType: MetaType.SUPPLIED, address: tokenAddress }];
  }

  async getLabel({ contractPosition }: DisplayPropsStageParams<BalancerVeBal>) {
    const suppliedToken = contractPosition.tokens.find(isSupplied)!;
    return `Voting Escrow ${getLabelFromToken(suppliedToken)}`;
  }

  async getTokenBalancesPerPosition({ address, contract }: GetTokenBalancesPerPositionParams<BalancerVeBal>) {
    const lockedBalance = await contract.locked(address);
    return [lockedBalance.amount];
  }
}
