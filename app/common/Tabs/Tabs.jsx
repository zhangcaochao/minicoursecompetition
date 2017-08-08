import React from "react"
import RadioManager from "./RadioManager";
import events from "./Event"

//topic;
var Item=RadioManager.Item;
var radioManagers={};
function refManager(key){
    var manager=radioManagers[key];
    if(!manager){
        var m=new RadioManager();
        manager=radioManagers[key]={m:m,r:0};
        m.onSelect(function(tag,c){
            events.publish(key,c.getContent())
        })
    }
    manager.r++;
    return manager.m;
}
function unrefManager(key){
    var manager=radioManagers[key];
    if(manager){
        manager.r--;
        if(manager.r==0){
            delete radioManagers[key];
        }
    }
}
class tabs extends React.Component{
    componentWillMount() {
        this.t=this.props.topic;
        var manager=refManager(this.t);        
        this.select=manager.select.bind(manager);
        this.m=manager;
    }
    componentDidMount() {
        if(this.t=="mainContent"){
            console.info(React.Children.count(this.props.children));
        }
        this.m.select();
    }
    componentWillUnmount(){
        unrefManager(this.t);
    }
    render(){
        return <div className={this.props.className}>
            {
                React.Children.map(this.props.children,function(item, i) {
                    if(item){
						return <Item className={this.props.subClassName} {...item.props} rM={this.m}>{item}</Item>
                    }
                }, this)
            }
        </div>
    }
    /*render(){
        return <RadioManager {...this.props} ref={this.ss} onSelected={this.os}>
            {this.props.children}
        </RadioManager>
    }*/
}

function container_handler(content){
    this.setState({content:content});
}
class container extends React.Component{
    constructor(a,b,c){
        super(a,b,c);
        this.state={content:null}
    }
    componentWillMount(){
        this.handler=events.subscribe(this.props.topic,container_handler,this)
    }
    componentWillUnmount() {
        this.handler();
    }
    render(){
        var content=this.state.content;
        var Elem,props;
        if(content){
            Elem=content.elem;
            props=content.props||{};
        }else{
            Elem="div"
            props={};
        }
        for(var i in this.props){
            if(i=="topic"){
                continue;
            }
            props[i]=this.props[i];
        }
        return <Elem {...props}/>
    }
}
tabs.propTypes=container.propTypes = {
  topic: React.PropTypes.string.isRequired //required;
};
module.exports={t:tabs,c:container}