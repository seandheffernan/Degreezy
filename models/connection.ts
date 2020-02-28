import mongoose from 'mongoose';

export async function get_connection() {
    mongoose.connect("mongodb+srv://test:kuzmin@cluster0-djdw5.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => console.log(error));
}
