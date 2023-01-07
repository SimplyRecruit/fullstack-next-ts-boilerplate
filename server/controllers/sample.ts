import Person from '../../models/Person';
import { Param, Body, Get, Post, Put, Delete, JsonController, QueryParam, Authorized } from 'routing-controllers';

@JsonController("/sample")
export class SampleController {
    @Get('/')
    getAll() {
        return 'This action returns all items';
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return 'This action returns item #' + id;
    }

    @Post("/")
    post(@Body() person: Person) {
        person = new Person("falan", "")
        throw "deneme"
        return person;
    }

    @Put('/:id')
    put(@Param('id') id: number, @Body() user: any) {
        return 'Updating a user...';
    }

    @Delete('/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }
}