import React,{Component} from 'react';

class TodoItems extends Component{
    constructor(props){
        super(props);
        
        this.createTasks=this.createTasks.bind(this);
    }


    edit(key,status){
        this.props.edit(key,status);
    }
    
    delete(key,status){
        this.props.delete(key,status);
        console.log(key,status)
    }

    handleCheck(key,status){
        this.props.check(key,status);
    }

    active(key,status){
        this.props.active(key,status);
    }


    
    createTasks(item){
        const styling={
            color:"red",
            marginLeft:"auto"
        }

        // console.log(item.key)

        return(
            
            <li key={item.key} onDoubleClick={()=> this.edit(item.key,item.status)} style={{display:"flex"}}><input type="checkbox" key={item.key} checked={this.props.isChecked} onClick={()=>this.handleCheck(item.key,item.status)} />&nbsp;{item.text}<span style={styling} onClick={()=>this.delete(item.key,item.status)}><strong>X</strong></span></li>
            
        )
}
    render(){
        // console.log(todoEnteries);
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
            <React.Fragment>
            <ul className="theList" style={listStyle}>
                {listItems}
                <hr/>
                <div id="tasks" style={taskStyle}><strong>Tasks in the List : </strong>{listItems.length}</div> 
            </ul>

            
        </React.Fragment>
             
        );
    }
};

export default TodoItems;