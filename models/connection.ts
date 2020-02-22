import mongoose from 'mongoose';

export function get_connection() {
    mongoose.connect("mongodb+srv://test:kuzmin@cluster0-djdw5.mongodb.net/test?retryWrites=true&w=majority", {newUrlParser: true})
        .catch(error => console.log(error));
}

