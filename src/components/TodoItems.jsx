import React,{Component} from 'react';

class TodoItems extends Component{
    constructor(props){
        super(props);
        
        this.createTasks=this.createTasks.bind(this);
    }

    edit(key){
        this.props.edit(key);
    }
    
    delete(key){
        this.props.delete(key);
    }
    
    createTasks(item){
        let styling={
            color:"red",
            marginLeft:"auto"
        }

        return <li key={item.key} onDoubleClick={()=> this.edit(item.key)} style={{display:"flex"}}>{item.text}<span style={styling} onClick={()=>this.delete(item.key)}><strong>X</strong></span></li>
    }

    render(){

        var todoEnteries = this.props.entries;
        var listItems = todoEnteries.map(this.createTasks);

        return(
            <ul className="theList">
                {listItems} 
            </ul>
        );
    }
};

export default TodoItems;