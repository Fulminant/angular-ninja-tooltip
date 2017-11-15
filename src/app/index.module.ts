/// <reference path="../../typings/index.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import './directives/directives.module';

module angularNinjaTooltip {
  'use strict';

  angular.module('angularNinjaTooltip', [
    'ui.router',
    'toastr',
    'directivesModule'
  ])
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController);
}
