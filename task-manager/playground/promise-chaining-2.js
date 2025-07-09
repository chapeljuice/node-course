import './../src/db/mongoose.js';
import Task from '../src/models/task.js';

Task.findByIdAndDelete('686e9907fef525167da0990e')
    .then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    })
    .then((count) => {
        console.log(count);
    })
    .catch((error) => {
        console.log(error);
    });

const deleteTaskAndCount = async () => {
    const task = await Task.findByIdAndDelete('686e943ed92eb4ebb47a373b');
    console.log(task);
    const count = await Task.countDocuments({ completed: true });
    console.log(count);
}

deleteTaskAndCount();