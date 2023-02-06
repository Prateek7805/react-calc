
function Button({className,dispatch, action, value}){
    return (
        <button className={className} onClick={()=>{dispatch({type : action, payload : {
            digit : value
        }})}}>
            {value}
        </button>
    )
}

export default Button;