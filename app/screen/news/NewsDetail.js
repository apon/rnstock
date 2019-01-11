/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-09 00:46:05
 * @modify date 2019-01-09 00:46:05
 * @desc [description]
 */
import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class NewsDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            htmlbody: '',
        }
    }

    async getNewsDetail() {
        const { navigation } = this.props;
        const newsUrl = navigation.getParam('link', 'http://apon.me');
        const response = await fetch(newsUrl)
        const text = await response.text();
        console.log(text);
        this.setState({
            htmlbody: text
        });
    }

    componentDidMount(){
        // this.getNewsDetail();
    }

    render() {
        const { navigation } = this.props;
        const newsUrl = navigation.getParam('link', 'http://apon.me');
        return (
            <WebView
                javaScriptEnabled={true}
                originWhitelist={['*']}
                source={{uri: newsUrl}}
            />
        );
    }
}