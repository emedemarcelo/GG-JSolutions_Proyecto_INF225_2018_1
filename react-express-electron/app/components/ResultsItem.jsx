import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Route, Redirect } from 'react-router'
import Graphs from './Graphs.jsx'
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class ResultsItem extends React.Component {
  state = {
    dense: true,
    secondary: false,
  };

  displayGraph = (e) => {
    this.props.history.push({
      pathname: "/graph",
      state: { opciones : this.props.opciones}
    });
  }

  getGraph = () => {

    const availabilityData = {
      name: "trafficc",
      columns: ["time", "value"],
      points: [
        [1400425947000, 52],
        [1400425948000, 18],
        [1400425949000, 26],
        [1400425950000, 93],
      ]
    };

    const series1 = new TimeSeries(availabilityData);

    return (<ChartContainer timeRange={series1.timerange()} width={800}>
      <ChartRow height="200">
        <YAxis id="axis1" label="AUD" min={0} max={100} width="60" type="linear" format="$,.2f" />
        <Charts>
          <LineChart axis="axis1" series={series1} />
        </Charts>
      </ChartRow>
    </ChartContainer>);
  }

  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{this.props.accion}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Solicitado en {this.props.fechaSolicitud}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              <ul>
                <li>Fecha de inicio: {this.props.fechaInicio}</li>
                <li>Fecha de término: {this.props.fechaTermino}</li>
                <li>Tasa de riesgo: {this.props.tasaRiesgo}</li>
                <li>Trayectorias: {this.props.trayectorias}</li>
              </ul>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">exportar</Button>
            <Button size="small" color="primary" onClick={this.displayGraph}>
              Ver gráfico
          </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

ResultsItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ResultsItem));