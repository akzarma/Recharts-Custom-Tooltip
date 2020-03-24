
import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  ResponsiveContainer,
  Cell,
  Label,
  text,
  LabelList
} from 'recharts';
import ChartTooltip from './ChartTooltip';
import './style.scss'

const mobileView = false


class BubbleChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      event: {},
    };
  }

  onBubbleClickHandle = (item) => {
    this.tooltipItems = [];
    this.setState({ showTooltip: false });
  }


  onBubbleHoverHandle = (item, active, event, actionCreator) => {
    const { tooltipData } = this.props;

    if (active) {
      if (actionCreator === 'tooltip') {
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        this.setState({ showTooltip: true });
      } else if (actionCreator === 'cell') {
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        this.tooltipItems = tooltipData;
        this.setState({ showTooltip: true, event });
      }
    } else {
      if (actionCreator === 'cell') {
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(() => {
          this.setState({ showTooltip: false });
        }, 200);
      }
      if (actionCreator === 'tooltip') {
        this.setState({ showTooltip: false });
      }
    }

  }

  getPositionStyle = (pageX, pageY, totalItems, y) => {
    let offsetLeft = 0;
    let offsetTop = 0;
    const cardHeight = 110;
    const top = pageY;
    const left = pageX;

    // if data point is at right most side of screen
    if (left + 370 > window.innerWidth) {
      offsetLeft -= 350;
    }


    // position according to y
    switch (y) {
      case 1:
        if (totalItems < 5) {
          offsetTop -= (totalItems - 1) * cardHeight;
        } else {
          offsetTop -= 3 * cardHeight;
        }
        break;
      case 2:
        if (totalItems === 3) {
          offsetTop -= 1 * cardHeight;
        } else if (totalItems >= 4) {
          offsetTop -= 2 * cardHeight;
        }
        break;
      case 3:
        if (totalItems === 3) {
          offsetTop -= 1 * cardHeight;
        } else if (totalItems >= 4) {
          offsetTop -= 1.5 * cardHeight;
        }
        break;
      case 4:
        if (totalItems >= 4) {
          offsetTop -= 1 * cardHeight;
        }
        break;
      default:
        break;
    }
    return { top: `${top + offsetTop}px`, left: `${left + offsetLeft}px` };
  }

  onCardClick = (item) => {
    this.setState({ showTooltip: false });
  }

  getDivPagePosition = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  render() {
    const { metaData } = this.props;
    const { showTooltip, event } = this.state;

    return (
      <div
        id="bubblechartId"
        onMouseLeave={() => { this.onBubbleHoverHandle({}, false, null, 'tooltip'); }}
        onMouseEnter={() => { this.onBubbleHoverHandle({}, false, null, 'tooltip'); }}
        onClick={() => { this.onBubbleHoverHandle({}, false, null, 'tooltip'); }}
      >
        {!mobileView && showTooltip ?
          <div
            className={`${(this.tooltipItems && this.tooltipItems.length > 4) && 'custom-tooltip-container'}`}
            id="graph-tooltip"
            style={{
              zIndex: '1',
              position: 'absolute',
              ...this.getPositionStyle(
                event && event.pageX,
                event && event.pageY,
                this.tooltipItems && this.tooltipItems.length,
                this.tooltipItems && this.tooltipItems.length && this.tooltipItems[0].y
              ),
            }}
            onMouseEnter={() => { this.onBubbleHoverHandle({}, true, null, 'tooltip'); }}
            onMouseLeave={() => { this.onBubbleHoverHandle({}, false, null, 'tooltip'); }}
          >
            <ChartTooltip data={this.tooltipItems} onCardClick={this.onCardClick} />
          </div>
          : null
        }
        <div className="remove-scroll">
          <ResponsiveContainer width="100%" minHeight="500px" minWidth="700px">
            <ScatterChart
              margin={{
                top: 70,
                right: 70,
                bottom: 70,
                left: 90,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                type="number"
                tickMargin={40}
                domain={[1, 5]}
                interval={0}
                ticks={[1, 2, 3, 4, 5]}
                dataKey="x"
                name="Months"
                unit=""
                padding={{ top: 20 }}
                axisLine={false}
                label={{
                  value: 'X',
                  offset: 50,
                  position: 'bottom',
                }}
              >
                <Label
                  value={
                    'X'
                  }
                  position="insideRight"
                  angle={0}
                  offset={-40}
                  style={{ textAnchor: 'middle', fontSize: '10px', margin: '30px' }}
                />
              </XAxis>
              <YAxis
                type="number"
                tickMargin={40}
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                dataKey="y"
                name="Profit per Year"
                unit=""
                orientation="left"
                padding={{ left: 50 }}
                axisLine={false}
              >
                <Label
                  value={
                    'High'
                  }
                  position="insideTop"
                  angle={0}
                  offset={-50}
                  style={{ textAnchor: 'middle', fontSize: '10px' }}
                />
                <Label
                  value={
                    'Y'
                  }
                  position="insideLeft"
                  angle={-90}
                  offset={-30}
                  style={{ textAnchor: 'middle' }}
                />
                <Label
                  value={
                    'Low'
                  }
                  position="insideBottom"
                  angle={0}
                  offset={-40}
                  style={{ textAnchor: 'middle', fontSize: '10px' }}
                />
              </YAxis>
              <ZAxis
                type="number"
                dataKey="radius"
                range={[1000, 4000]}
                name=""
                unit="   "
              />
              <Scatter
                name=""
                data={metaData}
                shape="circle"
                isAnimationActive={!mobileView}
                onMouseEnter={(item, i, e) => { e.persist(); this.onBubbleHoverHandle(item, true, { pageX: e.pageX, pageY: e.pageY }, 'cell'); }}
                onMouseLeave={() => { this.onBubbleHoverHandle({}, false, null, 'cell'); }}
              >
                {metaData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#2d8dfc"
                    stroke="rgba(51,51,51,0.2)"
                    strokeWidth={2}
                    onClick={() => this.onBubbleClickHandle(entry)}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div >
    );
  }
}

export default (BubbleChart);
