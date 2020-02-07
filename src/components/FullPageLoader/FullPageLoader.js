import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer, Loader } from 'semantic-ui-react'

export const FullPageLoader = ({
 loader: {
  active, completed
}
}) => (
  <Dimmer active={active > completed} data-cy="loader">
    <Loader />
  </Dimmer>
)

FullPageLoader.propTypes = {
  loader: PropTypes.shape({
    active: PropTypes.number,
    completed: PropTypes.number
  }).isRequired,
}

const mapStateToProps = (state) => ({
  loader: state.loader
})

export default connect(
  mapStateToProps
)(FullPageLoader)
