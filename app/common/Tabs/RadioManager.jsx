import React  from 'react';
function Itemselected(){
	this.setState({selected:true});
    var child=this.child;
	child.selected&&child.selected();
    this.s&&this.s();
}
function Itemunselected(){
	this.setState({selected:false});
    var child=this.child;
    if(child){
    	child.unselected&&child.unselected();
	    this.us&&this.us();//unselected
    }
}
function refresh(comp){
	if(this.last==comp){
		this.onSelected&&this.onSelected(comp.props.tag,comp.child);
	}
}
class radioManager extends React.Component {
	constructor(a,b,c){
		super(a,b,c)
		this.btns=[];
		this.last=null;
        this.deflt=0;
		if(a)
			this.onSelected=a.onSelected;

	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.onSelected){this.onSelected=nextProps.onSelected}
	}
	addComp(comp){
		if(!(comp instanceof Array)){
			comp=[comp];
		}
		for(var i=0,l=comp.length;i<l;i++){
			//comp.__parent=this;
		    var index=this.btns.push(comp[i]);
            if(comp[i].d){
                this.deflt=index-1;
                console.info("set default to "+this.deflt)
            }
		}
	}
	removeComp(comp){
		var btns=this.btns;
		if(!(comp instanceof Array)){
			comp=[comp];
		}
		for(var i=0,l=comp.length;i<l;i++){
			var index=btns.indexOf(comp[i]);
			if(index>=0){
				btns.splice(index,1);
			}
		}
	}
	select(comp){//存在动态添加的item的情况，所以这里保存的item顺序和显示的item顺序可能不一致，如果此处修改，要考虑该函数的配套修改
		if(this.btns.length<=0)
		{
			return;
		}
		var index=0;
		var component;
        if(comp==undefined){
            if(this.deflt==-1){
                console.info("skip selected");
                return;
            }else{
                index=this.deflt;
                this.deflt=-1;
            }
        }else if(typeof comp =="number"){
			index=comp;
		}
        else{
			var comps=this.btns;
			for(var i=0,l=comps.length;i<l;i++){
				var c=comps[i];
				if(c==comp||c.refs.c==comp){
					index=i;
					break;
				}
			}
		}
		if(index<=0)
			index=0;
		component=this.btns[index];
        if(component==this.last){
            return;
        }
		if(this.last){
			Itemunselected.call(this.last);
			this.last=null;
		}
		if(index<0||index>this.btns.length){
			return;
		}
		this.last=component;
		Itemselected.call(component);
		refresh.call(this,component);
	}
	componentDidMount() {
		this.select(0);
	}
	onSelect(cb){this.onSelected=cb}
	render(){
		return <div className={this.props.className}>
			{
				React.Children.map(this.props.children,function(item, i) {
					return <Item className={this.props.subClassName} {...item.props} rM={this}>{item}</Item>
				}, this)
			}
        </div>
	}
}

function clicked(){
	this.props.rM.select(this);
	this.props.onClick&&this.props.onClick();
}

class baseItem  extends React.Component {
	constructor(props){
		super(props);
		this.state={selected:false};
		if(!props.unclickble){
			this.c=clicked.bind(this);
		}

        this.si=(c)=>{
            this.child=c;
            if(c){
                c.refresh=refresh.bind(props.rM,this)
            }
        }
	}
	componentDidMount () {
		this.props.rM.addComp(this);
	}
	componentWillUnmount () {
		this.props.rM.removeComp(this);
	}
	render (){
		var cn="ri "+(this.props.className||"");
		if(this.state.selected){
			cn+=" active";
		}
		var children=this.props.children;
		var nchildren;
		var props={ref:this.si}
		if(React.Children.count(children)<=1){
            this.d=children.props.deflt;
            this.s=children.props.selected;
            this.us=children.props.unselected;
			nchildren=React.cloneElement(children,props)
		}else{
			nchildren=React.Children.map(this.props.children,function(item, i) {
				if(item.props._m){
                    this.d=item.props.deflt;
                    this.s=item.props.selected;
                    this.us=item.props.unselected;
					return React.cloneElement(item,props)
                }
				else
					return item;
			}, this)
		}
		return (
            <div className={cn} onClick={this.c}>{nchildren}</div>
		);
	}
}
var Item=baseItem;
radioManager.Item=baseItem;
module.exports=radioManager