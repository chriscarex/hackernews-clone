import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer, Loader } from 'semantic-ui-react'

export const FullPageLoader = ({
 loader: {
  active,
  loadedArticles,
  totalArticles,
  completed
}
}) => (
  <Dimmer active={active > completed} data-cy="loader">
    <Loader
      data-cy="message"
    >
      Loading {loadedArticles} of {totalArticles} articles
    </Loader>
  </Dimmer>
)

FullPageLoader.propTypes = {
  loader: PropTypes.shape({
    active: PropTypes.number,
    completed: PropTypes.number,
    loadedArticles: PropTypes.number,
    totalArticles: PropTypes.number
  }).isRequired,
}

const mapStateToProps = (state) => ({
  loader: state.loader
})

export default connect(
  mapStateToProps
)(FullPageLoader)
