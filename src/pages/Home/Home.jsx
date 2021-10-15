import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchUsers } from '../../actions/actions';
import Spinner from '../../components/Spinner/Spinner'
import UsersTable from '../../components/UsersTable/UsersTable';

function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (props.loading) {
        return (
            <Spinner/>
        );
    }

    else {
        return (
            <UsersTable users={props.users.filter(elem => elem.name)} len={props.users.length}/>
        );
    }
}

const mapStateToProps = state => ({
    users: state.global.users,
    loading: state.global.loading
});

export default connect(mapStateToProps, { fetchUsers })(Home)
