import { Register } from '~app-toolkit/decorators';
import { AbstractApp } from '~app/app.dynamic-module';
import { AaveV2AppModule } from '~apps/aave-v2/aave-v2.module';

import { GeistContractFactory } from './contracts';
import { FantomGeistBalanceFetcher } from './fantom/geist.balance-fetcher';
import { FantomGeistPositionPresenter } from './fantom/geist.position-presentation';
import { FantomGeistStableDebtTokenFetcher } from './fantom/geist.stable-debt.token-fetcher';
import { FantomGeistSupplyTokenFetcher } from './fantom/geist.supply.token-fetcher';
import { FantomGeistVariableDebtTokenFetcher } from './fantom/geist.variable-debt.token-fetcher';
import { GeistAppDefinition, GEIST_DEFINITION } from './geist.definition';
import { GeistIncentivesBalanceHelper } from './helpers/geist.incentives.balance-helper';
import { GeistPlatformFeesBalanceHelper } from './helpers/geist.platform-fees.balance-helper';

@Register.AppModule({
  appId: GEIST_DEFINITION.id,
  imports: [AaveV2AppModule],
  providers: [
    FantomGeistBalanceFetcher,
    FantomGeistPositionPresenter,
    FantomGeistStableDebtTokenFetcher,
    FantomGeistSupplyTokenFetcher,
    FantomGeistVariableDebtTokenFetcher,
    GeistAppDefinition,
    GeistContractFactory,
    GeistIncentivesBalanceHelper,
    GeistPlatformFeesBalanceHelper,
  ],
})
export class GeistAppModule extends AbstractApp() {}
