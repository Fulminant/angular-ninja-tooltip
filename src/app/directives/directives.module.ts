import { ninjaTooltip } from './ninja-tooltip/ninja-tooltip.directive';

module directivesModule {
  angular.module('directivesModule', [])
    .directive('ninjaTooltip', ninjaTooltip);
}