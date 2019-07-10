import { connect } from 'react-redux';
import { stopLoading, startLoading } from '../../actions/ui_actions'
import ShowGallery from './show_gallery';

const msp = ({ entities, session }) => {
    
}

const mdp = dispatch => ({
    stopLoading: () => dispatch(stopLoading()),
    startLoading: () => dispatch(startLoading()),
})

export default connect(msp, mdp)(ShowGallery);