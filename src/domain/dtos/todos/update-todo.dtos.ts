

export class UpdateTodoDto {
    private constructor(
        public readonly id?: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){
        const returnObj: {[key:string]: any} = {};

        if(this.text) returnObj.text = this.text;
        if(this.completedAt) returnObj.completeAt = this.completedAt;

        return returnObj;
    }

    static create(props:{[key:string]: any }): [string?, UpdateTodoDto?] {

        const {id, text, completeAt } = props;
        let newCompleteAt = completeAt;
        
        if (!id || isNaN(Number(id))){
            return['id must be a valid number']
        }

        if(completeAt){

            newCompleteAt = new Date( completeAt);

            if(newCompleteAt.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date']
            }

        }

        return [undefined, new UpdateTodoDto(id, text, newCompleteAt)];
    }


}