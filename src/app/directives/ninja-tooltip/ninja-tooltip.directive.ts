/** @ngInject */

export function ninjaTooltip(): angular.IDirective {
  return {
    restrict: 'A',
    scope: {
      direction: '@'
    },
    link: linkFunc,
    controller: NinjaTooltipController,
    controllerAs: 'vm'
  };
}

function linkFunc(scope: any, el: angular.IRootElementService, attrs: any, controller: any) {
  let tip = controller.$compile('<div ng-class="tipClass">{{ text }}<span class="ninja-tooltip-arrow"></span></div>')(scope);
  let tipClass = 'ninja-tooltip';
  let tipActive = 'active';
  let tipPosition = attrs.ninjaTooltipPosition;

  scope.text = attrs.ninjaTooltip;
  scope.tipClass = [tipClass];

  // Add direction classes.
  if (tipPosition) {
    scope.tipClass.push(tipPosition);
  }
  else {
    scope.tipClass.push('bottom');
  }

  controller.$document.find('body').append(tip);

  el.on('mouseover', (e: any) => {
    tip.css('display', 'inherit');

    // Added timeout for smooth animation.
    controller.$timeout(() => {
      tip.addClass(tipActive);
    }, 300);

    let pos = e.target.getBoundingClientRect();
    let offset = controller.getOffset(e.target);
    let tipHeight = tip[0].clientHeight;
    let tipWidth = tip[0].clientWidth;
    let elWidth = pos.width || pos.right - pos.left;
    let elHeight = pos.height || pos.bottom - pos.top;
    let tipOffset = 10;

    switch (tipPosition) {
      case 'right':
        offset.top = pos.top - (tipHeight / 2) + (elHeight / 2);
        offset.left = pos.right + tipOffset;
        break;
      case 'left':
        offset.top = pos.top - (tipHeight / 2) + (elHeight / 2);
        offset.left = pos.left - tipWidth - tipOffset;
        break;
      case 'bottom':
        offset.top = pos.top + elHeight + tipOffset;
        offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
        break;
      case 'top':
        offset.top = pos.top - tipHeight - tipOffset;
        offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
        break;
      default:
        offset.top = pos.top + elHeight + tipOffset;
        offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
        break;
    }

    tip.css({
      left: `${offset.left}px`,
      top: `${offset.top}px`
    });
  });

  el.on('mouseleave', () => {
    tip.removeClass(tipActive);

    // Added timeout for smooth animation.
    controller.$timeout(() => {
      tip.css('display', 'none');
    }, 300);
  })
}

interface IGetOffset {
  top: number,
  left: number
}

/** @ngInject */
export class NinjaTooltipController {
  constructor(
    public $document: any,
    public $compile: ng.ICompileService,
    private $window: any,
    public $timeout: ng.ITimeoutService
  ) {
  }

  /**
   * Method for get offset of angular element.
   *
   * @param element - angular element.
   * @returns {IGetOffset}
   */
  getOffset(element): IGetOffset {
    let documentElement = this.$document[0].documentElement;
    let box = element.getBoundingClientRect();
    let top = box.top + this.$window.pageYOffset - documentElement.clientTop;
    let left = box.left + this.$window.pageXOffset - documentElement.clientLeft;
    return { top: top, left: left };
  }

}