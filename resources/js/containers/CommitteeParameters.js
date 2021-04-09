const token = document.getElementById('token').content;
export const get = async ()=>{
    try {
        let res = await fetch('/committee-parameters');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const store = async (form) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        let res = await fetch('/committee-parameters', {
            method:'POST',
            body:fd,
            headers:{
                'accept':'application/json'
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const destroy = async (id) => {
    try {
        let fd = new FormData();
        fd.append('_token', token);
        fd.append('_method', 'DELETE');
        let res = await fetch(`/committee-parameters/${id}`, {
            method:'POST',
            body:fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (form, id) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        fd.append('_method', 'PUT');
        let res = await fetch(`/committee-parameters/${id}`, {
            method:'POST',
            body:fd,
            headers:{
                accept :'application/json'
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const find = async (id) => {
    try {
        let res = await fetch(`/committee-parameters/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const FindParameters = async(id) => {
    try {
        let res = await fetch(`/committee-parameters-general/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const storeParameters = async (form, id) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        fd.append('_method', 'PUT');
        let res = await fetch(`/committee-parameters-sesion-save/${id}`, {
            method:'POST',
            body:fd,
            headers:{
                accept :'application/json'
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    name: {
        name: 'nombre',
        type: 'text',
        message: '',
        required: true,
        isEmpty: true,
        isInvalid: true,
        min:5,
        max:80
    },
    act_template_id:{
        name:'plantilla',
        type:'numeric',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    slug:{
        name: 'slug',
        type: 'text',
        message: '',
        required: true,
        isEmpty: true,
        isInvalid: true,
        min: 8
    }
};


