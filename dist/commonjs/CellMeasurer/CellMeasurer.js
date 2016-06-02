'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Measures a Grid cell's contents by rendering them in a way that is not visible to the user.
 * Either a fixed width or height may be provided if it is desirable to measure only in one direction.
 */

var CellMeasurer = function (_Component) {
  _inherits(CellMeasurer, _Component);

  function CellMeasurer(props, state) {
    _classCallCheck(this, CellMeasurer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CellMeasurer).call(this, props, state));

    _this._cachedColumnWidths = {};
    _this._cachedRowHeights = {};

    _this.getColumnWidth = _this.getColumnWidth.bind(_this);
    _this.getRowHeight = _this.getRowHeight.bind(_this);
    _this.resetMeasurements = _this.resetMeasurements.bind(_this);
    return _this;
  }

  _createClass(CellMeasurer, [{
    key: 'getColumnWidth',
    value: function getColumnWidth(_ref) {
      var index = _ref.index;

      if (this._cachedColumnWidths[index]) {
        return this._cachedColumnWidths[index];
      }

      var rowCount = this.props.rowCount;


      var maxWidth = 0;

      for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        var _measureCell2 = this._measureCell({
          clientWidth: true,
          columnIndex: index,
          rowIndex: rowIndex
        });

        var width = _measureCell2.width;


        maxWidth = Math.max(maxWidth, width);
      }

      this._cachedColumnWidths[index] = maxWidth;

      return maxWidth;
    }
  }, {
    key: 'getRowHeight',
    value: function getRowHeight(_ref2) {
      var index = _ref2.index;

      if (this._cachedRowHeights[index]) {
        return this._cachedRowHeights[index];
      }

      var columnCount = this.props.columnCount;


      var maxHeight = 0;

      for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        var _measureCell3 = this._measureCell({
          clientHeight: true,
          columnIndex: columnIndex,
          rowIndex: index
        });

        var height = _measureCell3.height;


        maxHeight = Math.max(maxHeight, height);
      }

      this._cachedRowHeights[index] = maxHeight;

      return maxHeight;
    }
  }, {
    key: 'resetMeasurements',
    value: function resetMeasurements() {
      this._cachedColumnWidths = {};
      this._cachedRowHeights = {};
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._renderAndMount();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._updateDivDimensions(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unmountContainer();
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        getColumnWidth: this.getColumnWidth,
        getRowHeight: this.getRowHeight,
        resetMeasurements: this.resetMeasurements
      });
    }
  }, {
    key: '_getContainerNode',
    value: function _getContainerNode(props) {
      var container = props.container;


      if (container) {
        return _reactDom2.default.findDOMNode(typeof container === 'function' ? container() : container);
      } else {
        var node = _reactDom2.default.findDOMNode(this);

        return node.ownerDocument.body;
      }
    }
  }, {
    key: '_measureCell',
    value: function _measureCell(_ref3) {
      var _ref3$clientHeight = _ref3.clientHeight;
      var clientHeight = _ref3$clientHeight === undefined ? false : _ref3$clientHeight;
      var _ref3$clientWidth = _ref3.clientWidth;
      var clientWidth = _ref3$clientWidth === undefined ? true : _ref3$clientWidth;
      var columnIndex = _ref3.columnIndex;
      var rowIndex = _ref3.rowIndex;
      var cellRenderer = this.props.cellRenderer;


      var rendered = cellRenderer({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });

      this._div.innerHTML = _server2.default.renderToString(rendered);

      return {
        height: clientHeight && this._div.clientHeight,
        width: clientWidth && this._div.clientWidth
      };
    }
  }, {
    key: '_renderAndMount',
    value: function _renderAndMount() {
      if (!this._div) {
        this._div = document.createElement('div');
        this._div.style.display = 'inline-block';
        this._div.style.position = 'absolute';
        this._div.style.visibility = 'hidden';
        this._div.style.zIndex = -1;

        this._updateDivDimensions(this.props);

        this._containerNode = this._getContainerNode(this.props);
        this._containerNode.appendChild(this._div);
      }
    }
  }, {
    key: '_unmountContainer',
    value: function _unmountContainer() {
      if (this._div) {
        this._containerNode.removeChild(this._div);

        this._div = null;
      }

      this._containerNode = null;
    }
  }, {
    key: '_updateDivDimensions',
    value: function _updateDivDimensions(props) {
      var height = props.height;
      var width = props.width;


      if (height && height !== this._divHeight) {
        this._divHeight = height;
        this._div.style.height = height + 'px';
      }

      if (width && width !== this._divWidth) {
        this._divWidth = width;
        this._div.style.width = width + 'px';
      }
    }
  }]);

  return CellMeasurer;
}(_react.Component);

CellMeasurer.propTypes = {
  /**
   * Renders a cell given its indices.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  cellRenderer: _react.PropTypes.func.isRequired,

  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ getColumnWidth, getRowHeight, resetMeasurements }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Number of columns in grid.
   */
  columnCount: _react.PropTypes.number.isRequired,

  /**
   * A Node, Component instance, or function that returns either.
   * If this property is not specified the document body will be used.
   */
  container: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.node]),

  /**
   * Assign a fixed :height in order to measure dynamic text :width only.
   */
  height: _react.PropTypes.number,

  /**
   * Number of rows in grid.
   */
  rowCount: _react.PropTypes.number.isRequired,

  /**
   * Assign a fixed :width in order to measure dynamic text :height only.
   */
  width: _react.PropTypes.number
};
exports.default = CellMeasurer;