function isPromise(promise){
    return promise && promise.then && (typeof promise.then === 'function') && promise.catch && (typeof promise.catch === 'function');
}



export default{
    data(){
        return {
            status:0,
            result:null,
            id:0,
        }
    },
    props:{
        promise:{
            required:true,
            validator:isPromise,
        },
    },
    watch:{
        promise:{
            handler:function(){
                this.reset();
                this.watchPromise();
            },
            immediate:true,
        },
    },
    methods:{
        reset(){
            this.status = 0;
            this.result = null;
            this.id++;
        },
        watchPromise(){

            let id = this.id;
            let promise = this.promise;

            promise.then((rst)=>{

                let curId = this.id;
                if(id === curId){
                    this.resolve(rst);
                }

            }).catch((err)=>{
                let curId = this.id;
                if(id === curId){
                    this.reject(err);
                }

            });
        },
        resolve(rst){
            this.status = 1;
            this.result = rst;
        },
        reject(err){
            this.status = -1;
            this.result = err;
        },

    },
    render(h){
        switch(this.status){
            case 0:
                let slotName;
                if(this.$slots.default){
                    slotName = 'default';
                }else if(this.$slots.pending){
                    slotName = 'pending'
                }
                
                return slotName && this.$slots[slotName][0];
            case 1:
                let scopedSlotName;
                if(this.$scopedSlots.default){
                    scopedSlotName = 'default';
                }else if(this.$scopedSlots.then){
                    scopedSlotName = 'then';
                }

                if(scopedSlotName){
                    let vnodes = this.$scopedSlots[scopedSlotName](this.result);
                    return vnodes && vnodes[0];
                }

                break;
            case -1:
                if(this.$scopedSlots.catch){
                    let vnodes = this.$scopedSlots.catch(this.result);
                    return vnodes && vnodes[0];
                }
                
        }
        
    },
}