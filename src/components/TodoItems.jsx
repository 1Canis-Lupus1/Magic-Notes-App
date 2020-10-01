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

        return <li key={item.key} onDoubleClick={()=> this.edit(item.key)} style={{display:"flex"}}><input type="radio" value={item.key} />&nbsp;{item.text}<span style={styling} onClick={()=>this.delete(item.key)}><strong>X</strong></span></li>
    }

    render(){
        let listStyle={
            padding: "10px 20px",
        }
        
        let taskStyle={
            marginTop:"20px",
            border: "2px dotted black",
            height: "20px",
            padding: "10px 0px 10px 18px"
        }

        var todoEnteries = this.props.entries;
        var listItems = todoEnteries.map(this.createTasks);

        return(
            <ul className="theList" style={listStyle}>
                {listItems}
                <hr/>
                <div id="tasks" style={taskStyle}><strong>Tasks in the List : </strong>{listItems.length}</div> 
            </ul>
        );
    }
};

export default TodoItems;