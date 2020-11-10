import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./dashboard.css";
import WidgetBar from "./widgetBar";
import WidgetDoughnut from "./widgetDoughnut";
import WidgetText from "./widgetText";
import WidgetDoughnut3d from "./WidgetDoughnut3d";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      referralSource: null,
      socialSource: null,
      pageViews: null,
      sessions: null,
      users: null,
      newUsers: null,
      avgSessionTime: null,
      pagePerSession: null,
      bounceRate: null,
      sourceArr: [],
      usersArr: [],
      userSession: []
    };
  }
  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let organicSource = 0;
    let directSource = 0;
    let pageViews = 0;
    let referralSource = 0;
    let socialSource = 0;
    let users = 0;
    let newUsers = 0;
    let sessions = 0;
    let selectedValue = null;
    let sourceArr = [];
    let usersArr = [];
    let userSession = [];
    let sessionPerUser = 0;
    let avgSessionTime = 0;
    let pagePerSession = 0;
    let bounceRate = 0;
    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        socialSource = arr[i].social_source;
        sessions = arr[i].sessions;
        sessionPerUser = arr[i].number_of_sessions_per_users;
        avgSessionTime = arr[i].avg_session_time;
        pagePerSession = arr[i].page_per_session;
        bounceRate = arr[i].bounce_rate;
        sourceArr.push(
          {
            label: "Organic Source",
            value: organicSource
          },
          {
            label: "Direct",
            value: directSource
          },
          {
            label: "Referral",
            value: referralSource
          }
        );
        usersArr.push(
          {
            label: "Users",
            value: users
          },
          {
            label: "New Users",
            value: newUsers
          }
        );
        userSession.push(
          {
            label: "Users",
            value: users
          },
          {
            label: "Sessions",
            value: sessions
          },
          {
            label: "Number of sessions per users",
            value: sessionPerUser
          }
        );
      }
    }
    //selectedValue = arg;
    this.setState({
      selectedValue: arg,
      organicSource: organicSource,
      directSource: directSource,
      referralSource: referralSource,
      pageViews: pageViews,
      users: users,
      newUsers: newUsers,
      sourceArr: sourceArr,
      usersArr: usersArr,
      socialSource: socialSource,
      sessions: sessions,
      userSession: userSession,
      pagePerSession: pagePerSession,
      avgSessionTime: avgSessionTime,
      bounceRate: bounceRate
    });
  };
  updateDashBoard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row className="TopHeader">
            <Col>Dashboard</Col>
            <Col>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashBoard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mainDashboard">
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Direct Source"
                value={this.state.directSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Referral Source"
                value={this.state.referralSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Social Source"
                value={this.state.socialSource}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>

            <Col>
              <WidgetText title="Page Views" value={this.state.pageViews} />
            </Col>

            <Col>
              <WidgetText
                title="Number of sessions"
                value={this.state.sessions}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText
                title="Page Per Session"
                value={this.state.pagePerSession}
              />
            </Col>
            <Col>
              <WidgetText
                title="Average Session Time"
                value={this.state.avgSessionTime}
              />
            </Col>
            <Col>
              <WidgetText title="Bounce Rate" value={this.state.bounceRate} />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetBar
                title="Source Comparison"
                data={this.state.sourceArr}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetDoughnut
                title="Users Comparison"
                data={this.state.usersArr}
              />
            </Col>
            <Col>
              <WidgetDoughnut3d
                title="Sessions/Users Comparison"
                data={this.state.userSession}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default dashboard;
