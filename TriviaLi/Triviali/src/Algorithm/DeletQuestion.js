const DeletQuestion = (questions) => {

    if(questions.length>1){
        
        const [first , ...rest] = questions;
        return rest;
    }else{
        return [];
    }
   

}
export default DeletQuestion;