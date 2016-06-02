
import CellSizeAndPositionManager from './CellSizeAndPositionManager';

/**
 * Browsers have scroll offset limitations (eg Chrome stops scrolling at ~33.5M pixels).
 * After a certain position, the browser won't allow the user to scroll further (even via JavaScript scroll offset adjustments).
 * This util picks a lower ceiling for max size and artificially adjusts positions within to make it transparent for users.
 */
export var DEFAULT_MAX_SCROLL_SIZE = 10000000;

/**
 * Extends CellSizeAndPositionManager and adds scaling behavior for lists that are too large to fit within a browser's native limits.
 */

var ScalingCellSizeAndPositionManager = function (_CellSizeAndPositionM) {
  babelHelpers.inherits(ScalingCellSizeAndPositionManager, _CellSizeAndPositionM);

  function ScalingCellSizeAndPositionManager(_ref) {
    var _ref$maxScrollSize = _ref.maxScrollSize;
    var maxScrollSize = _ref$maxScrollSize === undefined ? DEFAULT_MAX_SCROLL_SIZE : _ref$maxScrollSize;
    var params = babelHelpers.objectWithoutProperties(_ref, ['maxScrollSize']);
    babelHelpers.classCallCheck(this, ScalingCellSizeAndPositionManager);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ScalingCellSizeAndPositionManager).call(this, params));

    _this._maxScrollSize = maxScrollSize;
    return _this;
  }

  /**
   * Number of pixels a cell at the given position (offset) should be shifted in order to fit within the scaled container.
   * The offset passed to this function is scalled (safe) as well.
   */


  babelHelpers.createClass(ScalingCellSizeAndPositionManager, [{
    key: 'getOffsetAdjustment',
    value: function getOffsetAdjustment(_ref2) {
      var containerSize = _ref2.containerSize;
      var offset // safe
      = _ref2.offset;

      var totalSize = babelHelpers.get(Object.getPrototypeOf(ScalingCellSizeAndPositionManager.prototype), 'getTotalSize', this).call(this);
      var safeTotalSize = this.getTotalSize();
      var offsetPercentage = this._getOffsetPercentage({
        containerSize: containerSize,
        offset: offset,
        totalSize: safeTotalSize
      });

      return Math.round(offsetPercentage * (safeTotalSize - totalSize));
    }

    /** See CellSizeAndPositionManager#getTotalSize */

  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      return Math.min(this._maxScrollSize, babelHelpers.get(Object.getPrototypeOf(ScalingCellSizeAndPositionManager.prototype), 'getTotalSize', this).call(this));
    }

    /** See CellSizeAndPositionManager#getUpdatedOffsetForIndex */

  }, {
    key: 'getUpdatedOffsetForIndex',
    value: function getUpdatedOffsetForIndex(_ref3) {
      var _ref3$align = _ref3.align;
      var align = _ref3$align === undefined ? 'auto' : _ref3$align;
      var containerSize = _ref3.containerSize;
      var currentOffset = _ref3.currentOffset;
      var // safe
      targetIndex = _ref3.targetIndex;

      currentOffset = this._safeOffsetToOffset({
        containerSize: containerSize,
        offset: currentOffset
      });

      var offset = babelHelpers.get(Object.getPrototypeOf(ScalingCellSizeAndPositionManager.prototype), 'getUpdatedOffsetForIndex', this).call(this, {
        align: align,
        containerSize: containerSize,
        currentOffset: currentOffset,
        targetIndex: targetIndex
      });

      return this._offsetToSafeOffset({
        containerSize: containerSize,
        offset: offset
      });
    }

    /** See CellSizeAndPositionManager#getVisibleCellRange */

  }, {
    key: 'getVisibleCellRange',
    value: function getVisibleCellRange(_ref4) {
      var containerSize = _ref4.containerSize;
      var offset // safe
      = _ref4.offset;

      offset = this._safeOffsetToOffset({
        containerSize: containerSize,
        offset: offset
      });

      return babelHelpers.get(Object.getPrototypeOf(ScalingCellSizeAndPositionManager.prototype), 'getVisibleCellRange', this).call(this, {
        containerSize: containerSize,
        offset: offset
      });
    }
  }, {
    key: '_getOffsetPercentage',
    value: function _getOffsetPercentage(_ref5) {
      var containerSize = _ref5.containerSize;
      var offset = _ref5.offset;
      var // safe
      totalSize = _ref5.totalSize;

      return totalSize <= containerSize ? 0 : offset / (totalSize - containerSize);
    }
  }, {
    key: '_offsetToSafeOffset',
    value: function _offsetToSafeOffset(_ref6) {
      var containerSize = _ref6.containerSize;
      var offset // unsafe
      = _ref6.offset;

      var totalSize = babelHelpers.get(Object.getPrototypeOf(ScalingCellSizeAndPositionManager.prototype), 'getTotalSize', this).call(this);
      var safeTotalSize = this.getTotalSize();

      if (totalSize === safeTotalSize) {
        return offset;
      } else {
        var offsetPercentage = this._getOffsetPercentage({
          containerSize: containerSize,
          offset: offset,
          totalSize: totalSize
        });

        return Math.round(offsetPercentage * (safeTotalSize - containerSize));
      }
    }
  }, {
    key: '_safeOffsetToOffset',
    value: function _safeOffsetToOffset(_ref7) {
      var containerSize = _ref7.containerSize;
      var offset // safe
      = _ref7.offset;

      var totalSize = babelHelpers.get(Object.getPrototypeOf(ScalingCellSizeAndPositionManager.prototype), 'getTotalSize', this).call(this);
      var safeTotalSize = this.getTotalSize();

      if (totalSize === safeTotalSize) {
        return offset;
      } else {
        var offsetPercentage = this._getOffsetPercentage({
          containerSize: containerSize,
          offset: offset,
          totalSize: safeTotalSize
        });

        return Math.round(offsetPercentage * (totalSize - containerSize));
      }
    }
  }]);
  return ScalingCellSizeAndPositionManager;
}(CellSizeAndPositionManager);

export default ScalingCellSizeAndPositionManager;