const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb...'))
    .catch(() => console.log('cant connect to mongodb...'));
const schema = new mongoose.Schema {
    name: String,
    author: String,
    isPublished: Boolean,
    tags: [String]
};
const Course = mongoose.model('courses', schema);
async function createCourse() {
    const course = new Course({
        name: 'Angular.js Course',
        author: 'Cronus',
        isPublished: true,
        tags: ['framework', 'frontend', 'dynamic']
    })
    const result = await course.save();
    console.log(result)
}
// query first approach...
async function updateCourseUsingQuery(id) {
    const course = await Course.findById(id);
    course.set({
        isPublished: false,
        author: 'Hydra'
    })
    const result = await course.save();
    console.log(result)
};
// updateCourseUsingQuery("5eb01dcf36a50f2d04e98c75");
async function updateCourseUsingUpdate(id) {
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Hydra',
            isPublished: true,
            name: 'Angular.js'
        },
    })
    console.log(result)
}
// updateCourseUsingUpdate("5eb01dcf36a50f2d04e98c75")
async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result)
};
removeCourse("5eb01dcf36a50f2d04e98c75")