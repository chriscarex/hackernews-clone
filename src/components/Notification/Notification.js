import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

export const Notification = ({
  isNotificationActive,
  notification
}) => (isNotificationActive && (
  <Segment
    inverted
    color="red"
    className="notification"
    data-cy="notification"
  >
    {notification}
  </Segment>
))

Notification.propTypes = {
  isNotificationActive: PropTypes.bool.isRequired,
  notification: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  isNotificationActive: state.notification.active,
  notification: state.notification.message
})

export default connect(
  mapStateToProps
)(Notification)
