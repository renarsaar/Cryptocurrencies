import React from 'react';
import Chart from 'react-apexcharts';

// Return the time elapsed
function timeSince(date) {
  const parsedData = Date.parse(date);
  const seconds = Math.floor(new Date() - parsedData) / 1000;
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1)
    return `${interval === 1 ? "1 year ago" : `${interval} years ago`}`;
  interval = Math.floor(seconds / 2592000);

  if (interval >= 1)
    return `${interval === 1 ? "1 month ago" : `${interval} months ago`}`;
  interval = Math.floor(seconds / 86400);

  if (interval >= 1)
    return `${interval === 1 ? "1 day ago" : `${interval} days ago`}`;
  interval = Math.floor(seconds / 3600);

  if (interval >= 1)
    return `${interval === 1 ? "1 hour ago" : `${interval} hours ago`}`;
  interval = Math.floor(seconds / 60);

  if (interval >= 1)
    return `${interval === 1 ? "1 minute ago" : `${interval} minutes ago`}`;

  return "Just now";
}

// Format Price with Commas
function numberWithCommas(num) {
  return Number.parseFloat(num)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ApexChart({ data, interval, theme }) {
  if (data[0] === undefined) {
    return (
      <>
        <div className="placeholder"></div>
        <div className="placeholder"></div>
      </>
    );
  }

  return data.map((x) => {
    return (
      <div
        key={x.id}
        style={{
          background: theme.foreground,
          color: theme.textcolor,
          boxShadow: theme.boxshadow
        }}
        className="chart"
      >
        <div className="single">
          <div className="item">

            <div className="name">
              <div className="currency">
                <img src={x.logo_url} alt={x.id} />
                {x.name}
                <span>({x.id})</span>
              </div>
              <span className="rank">Rank: {x.rank}</span>
            </div>

            <div className="prices">
              <div>
                Price:
                {" "}
                <span className="highlight">{numberWithCommas(x.price) + " €. "}</span>
                Updated
                {" "}
                <span>{timeSince(x.price_timestamp)}.</span>
              </div>

              <div>
                Market Cap:
                {" "}
                <span className="highlight">
                  {numberWithCommas(x.market_cap) + " €."}
                </span>
              </div>

              <div>
                Circluating Supply:
                {" "}
                <span className="highlight">
                  {x.circulating_supply + " pcs."}
                </span>
              </div>

              <div>
                Highest price recorded
                {" "}
                <span className="highlight">
                  {numberWithCommas(x.high) + "€."}
                </span>
                {" "}
                {timeSince(x.high_timestamp)}
              </div>
            </div>
          </div>
        </div>
        <Chart
          type="radialBar"
          className="radialBar"
          width={300}
          height={300}
          series={[Math.abs(x[interval].price_change)]}
          options={{
            chart: {
              height: 350,
              type: "radialBar",
              toolbar: {
                show: true,
              },
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: "70%",
                  background: "#fff",
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24,
                  },
                },
                track: {
                  background: "#fff",
                  strokeWidth: "67%",
                  margin: 0,
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35,
                  },
                },

                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: "#888",
                    fontSize: "17px",
                  },
                  value: {
                    formatter: function (val) {
                      return parseInt(val);
                    },
                    color: "#111",
                    fontSize: "36px",
                    show: true,
                  },
                },
              },
            },
            fill: {
              type: "gradient",
              colors: ["#e2e734"],
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: [
                  x[interval].price_change > 0 ? "#27d853" : "#ef3636",
                ],
                inverseColors: true,
                stops: [0, 100],
              },
            },
            stroke: {
              lineCap: "round",
            },
            labels: [
              x[interval].price_change > 1 ? "Price rise(€)" : "Price fall(€)",
            ],
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
    );
  });
};
