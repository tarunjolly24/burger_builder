//adding http request to burger builder
// https://react-my-burger-77fd1-default-rtdb.firebaseio.com/
import axios from 'axios';

const instance= axios.create({
    baseURL:'https://react-my-burger-77fd1-default-rtdb.firebaseio.com/'
})

export default instance;