import { Request, Response } from 'express'
import { prisma } from '../../data/postgresDB';


export class TodosController {

    constructor() { };

    public getTodos = async(req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();
        return res.json(todos);

    }

    public getTodoById = async(req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number` });
        const todo = await prisma.todo.findFirst({where: {id}});

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found` })

    }

    public createTodo = async(req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) return res.status(400).json({ error: 'text property is required' });

        const todo  = await prisma.todo.create({
            data:{ text }
        })

        res.json( todo );

    }

    public updateTodo = async(req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number` });

        //const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({where: {id}});
        if (!todo) return res.status(404).json({ error: `Todo with id: ${id} not found` });

        const { text, completeAt } = req.body;
        
        const updateTodo = await prisma.todo.update({
            where: {id},
            data: {text, 
            completeAt: (completeAt) ? new Date(completeAt) : null
            }
        })

        res.json(updateTodo);


    }

    public deleteTodo = async(req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number` });

        const todo = await prisma.todo.findFirst({where: {id}});
        if (!todo) return res.status(404).json({ error: `Todo with id: ${id} not found` });

        const deleteTodo = await prisma.todo.delete({where:{id}});
        // todos.splice(todos.indexOf(todo), 1);

        res.json({todo, deleteTodo});

    }

}

