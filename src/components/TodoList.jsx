import React,{Component} from 'react';
// import TodoItems from './TodoItems';
import './TodoList.css';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state={
            items: [],
            showItems:[],
            status:"All"
        };

        this.addItem=this.addItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.editItem=this.editItem.bind(this);
        this.checkItem=this.checkItem.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.renderList=this.renderList.bind(this);
    }

    //Concat the new list to our state - 'item'
    addItem(event){
        // this._inputElement.value.trim();
        if(this._inputElement.value.trim() !== ""){
            var newItem={
                text: this._inputElement.value,
                key: Date.now(),
                checked: false
            };

            this.setState((prevState)=>{
                return {
                    items: prevState.items.concat(newItem),
                    showItems: prevState.items.concat(newItem)
                };
            });
            this._inputElement.value="";
        }
        
        // console.log(this.state.items);
        // console.log(this.state.showItems)

        event.preventDefault();
    }

    //Filtering the key that we want to delete
    deleteItem(key,status){
        let filteredItems =this.state.items.filter(function(item){
            return(item.key !== key);
        });

        this.setState({
            items: filteredItems,
            showItems: filteredItems
        });

        // console.log(filteredItems)
    }

    //Editing the notes
    editItem(key,status){
        let editingItem = this.state.items.filter(function(item){
            return(item.key === key);
        });

        this._inputElement.value=editingItem[0].text;

        let filteredItems =this.state.items.filter(function(item){
            return(item.key !== key);
        });

        this.setState({
            items: filteredItems,
            showItems: filteredItems
        });
        // console.log(editingItem)
    }

    checkItem(key,status){
        let data1=this.state.items.map(function(item){
            if(item.key === key ){
                return{
                    ...item,
                    checked:!item.checked
                }
            }
            else{
                return{
                    ...item
                }
            }
            });

            let data2=this.state.showItems.map(function(item){
                if(item.key === key ){
                    return{
                        ...item,
                        checked:!item.checked
                    }
                }
                else{
                    return{
                        ...item
                    }
                }
                });

        // console.log(this.state.items)
        this.setState({
            items: data1,
            showItems: data2
        });

        
    }

    handleSelect(e){
        // console.log("Clicked");
        this.setState({
            status: e.target.value
        },()=>{
            if(this.state.status === "Active"){
            let allActive= this.state.items.filter((item)=> !item.checked);
            this.setState({
               showItems: allActive 
            });
        }
            else if(this.state.status === "Completed"){
                let allCompleted=this.state.items.filter((item)=>item.checked);
                this.setState({
                    showItems:allCompleted
                });
            }
            else{
                this.setState({
                    showItems: this.state.items
                },()=>{console.log(this.state.showItems)})
            }

        })
    }
    
    // edit(key,status){
    //     this.edit(key,status);
    // }
    
    // delete(key,status){
    //     this.delete(key,status);
    //     console.log(key,status)
    // }

    // handleCheck(key,status){
    //     this.check(key,status);
    // }

    // active(key,status){
    //     this.active(key,status);
    // }


    
    renderList(){
        const styling={
            color:"red",
            marginLeft:"auto"
        }

        let listItem=[];

        this.state.showItems.forEach((item)=>{
            listItem.push(
            <li key={item.key} onDoubleClick={()=> this.editItem(item.key,item.status)} style={{display:"flex"}}><input type="checkbox" key={item.key} checked={this.props.isChecked} onClick={()=>this.checkItem(item.key,item.status)} />&nbsp;{item.text}<span style={styling} onClick={()=>this.deleteItem(item.key,item.status)}><strong>X</strong></span></li>

        )});

        return listItem;

        // console.log(item.key)
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

        // var listItems = .map(this.showList);
        return(
    
            
            <React.Fragment>
                <div className="todoListMain">
                    <div className="header">
                        <h2>Magic-Notes App</h2>
                        <form onSubmit={this.addItem}>
                            <input ref={ (a)=> this._inputElement = a } placeholder="Enter Task" required/>
                            <button type="submit">Add Note</button>
                        </form>
                    </div>
                    <hr/>
                    <ul className="theList" style={listStyle}>
                    {this.renderList()}
                    <hr/>
                    {/* <div id="tasks" style={taskStyle}><strong>Tasks in the List : </strong>{this.renderList.length}</div>  */}
                </ul>
    
                    <div className="stats">
                        {/* <button onClick={this.handleSelect} className='btn-stats select' id="rd-1" >Select All</button>&nbsp; */}
                        <button onClick={this.handleSelect} value="All" className='btn-stats all'>All</button>&nbsp;
                        <button onClick={this.handleSelect} value="Active" className='btn-stats active'>Active</button>&nbsp;
                        <button onClick={this.handleSelect} value="Completed" className='btn-stats completed'>Completed</button>
                     </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TodoList;