import * as React from 'react';
import { Segment, Statistic } from 'semantic-ui-react'

export default class RevenueList extends React.Component {
    render() {
        return (
            this.props.activityList.map(activity => (
                activity.title.map((element, index) => (
                    <Segment>
                        <Statistic>
                            <text>{element}</text>
                            <Statistic.Value>{activity.revenue[index]}</Statistic.Value>
                        </Statistic>
                    </Segment>
                ))
            ))
        )
    }
}