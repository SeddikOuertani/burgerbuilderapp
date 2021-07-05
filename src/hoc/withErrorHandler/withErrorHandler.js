import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                error : null,
            }

            this.requestInterceptor = axios.interceptors.request.use(request=>{
                this.setState({error : null});
                return request;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error : error
                })
            })
        }

        errorConfirmerHandler = () =>{
            this.setState({
                error : null
            })
        }

        componentWillUnmount(){
            console.log('will unmout', this.requestInterceptor, this.responseInterceptor )
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render(){
            
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmerHandler}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>;
                </Aux>
            
            )
        }
    }

}

export default withErrorHandler