import Person from '../../models/Person';
import PersonEntity from "../entities/PersonEntity"
import { Param, Body, Get, Post, Put, Delete, JsonController, QueryParam, Authorized } from 'routing-controllers';
import HatEntity from '../entities/HatEntity';

@JsonController("/sample")
export class SampleController {
    @Get('/')
    getAll() {
        return PersonEntity.find();
    }

    @Get('/:id')
    async getOne(@Param('id') id: number) {
        return await PersonEntity.findOneBy({ id }) ?? "Bulunamadı";
    }

    @Post("/")
    async post(@Body() person: Person) {
        const hat = HatEntity.create({ color: "red" })
        await PersonEntity.create({ ...person, hat }).save()
        return "Done";
    }

    @Put('/:id')
    async put(@Param('id') id: number, @Body() person: Person) {
        const currentPerson = await PersonEntity.findOneBy({ id })
        if (currentPerson == null) return "Not Found"
        currentPerson.name = person.name
        currentPerson.surname = person.surname
        await currentPerson.save()
        return 'Done';
    }

    @Delete('/:id')
    async remove(@Param('id') id: number) {
        const currentPerson = await PersonEntity.findOneBy({ id })
        if (currentPerson == null) return "Not Found"
        await currentPerson.remove()
        return "Removed";
    }
}