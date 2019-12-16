import React, { Component } from 'react';
import Loader from "../Loader";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            data: undefined
        };

        this.getUserData();
    }

    getUserData() {
        fetch('/api/profile/' + this.state.id)
            .then(results => results.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        if (this.state.data) {
            if (!this.state.data.error) {
                let data = this.state.data;

                return <div className="profile">
                    <div className="avatar">
                        <img src={data.avatar} alt={data.username}/>
                    </div>
                    <div className="description">
                        <div className="name">{data.username}<small>#{data.discriminator}</small></div>
                        <div className="position">Место: {data.position}</div>
                        <div className="rating">Рейтинг: {data.rating}</div>
                        <div className="tokens">Токенов: {data.balance}</div>
                    </div>
                </div>
            } else{
                return "Такого пользователя не существует"
            }
        } else{
            return <Loader />
        }
    }
}

export default Profile;