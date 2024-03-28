<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit User</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.users.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Surname</label>
                    <input type="text" v-model="model.users.surname" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="model.users.email" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Phone</label>
                    <input type="text" v-model="model.users.phone" class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="updateUsers" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'usersEdit',
    data() {
        return {
            userId: '',
            errorList: '',
            model: {
                users: {
                    name: '',
                    surname: '',
                    email: '',
                    phone: ''

                }
            }
        }

    },
    mounted() {

        //console.log(this.$route.params.id)
        this.userId = this.$route.params.id;
        this.getUsersData(this.$route.params.id);
    },

    methods: {

        getUsersData(userId) {

            axios.get(`http://localhost:8000/api/users/edit/${userId}`)
                .then(res => {
                    console.log(res.data.users);

                    this.model.users = res.data.users
                })
                .catch(function (error) {

                    if (error.response) {

                        if (error.response.status == 404) {

                            alert(error.response.data.message);
                        }
                    }
                });


        },

        updateUsers() {
            var mythis = this;
            axios.put(`http://localhost:8000/api/users/update/${this.userId}`, this.model.users)
                .then(res => {

                    console.log(res.data)
                    alert(res.data.message);

                    this.errorList = '';
                })
                .catch(function (error) {

                    if (error.response) {

                        if (error.response.status == 422) {

                            mythis.errorList = error.response.data.errors;
                        }

                        if (error.response.status == 404) {

                            alert(error.response.data.message);
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
        }
    },
}

</script>