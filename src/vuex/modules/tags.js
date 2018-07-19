/*
* @Author: xiaoc
* @Date:   2018-06-19 11:06:36
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 21:43:12
*/
const tagObj = {
	label: '',
    value: '',
    query: '',
    num: '',
    close: true
}

function setFistTag(list) {
	if (list.length == 1) {
        list[0].close = false;
    } else {
        list.some(a => {
            a.close = true
        })
    }
    return list;
}


const tags = {
    state: {
        tagList: getStore({ name: 'tagList' }) || [],
        tag: getStore({ name: 'tag' }) || tagObj,
        tagWel: {
            label: "首页",
            value: "/dev/index"
        },
        tagCurrent: getStore({ name: 'tagCurrent' }) || [],
    },
    actions: {

    },
    mutations: {
        ADD_TAG: (state, action) => {
            state.tag = action;
            setStore({ name: 'tag', content: state.tag, type: 'session' })
            if (state.tagList.some(a => a.value === action.value)) return
            state.tagList.push({
                label: action.label,
                value: action.value,
                query: action.query,
            })
            state.tagList = setFistTag(state.tagList);
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        SET_TAG_CURRENT: (state, tagCurrent) => {
            state.tagCurrent = tagCurrent;
            setStore({ name: 'tagCurrent', content: state.tagCurrent, type: 'session' })
        },
        SET_TAG: (state, value) => {
            state.tagList.forEach((ele, num) => {
                if (ele.value === value) {
                    state.tag = state.tagList[num];
                    setStore({ name: 'tag', content: state.tag, type: 'session' })
                }
            });
        },
        DEL_ALL_TAG: (state, action) => {
            state.tag = tagObj;
            state.tagList = [];
            state.tagList.push(state.tagWel);
            removeStore({ name: 'tag' });
            removeStore({ name: 'tagList' });
        },
        DEL_TAG_OTHER: (state, action) => {
            state.tagList.forEach((ele, num) => {
                if (ele.value === state.tag.value) {
                    state.tagList = state.tagList.slice(num, num + 1)
                    state.tag = state.tagList[0];
                    state.tagList[0].close = false;
                    setStore({ name: 'tag', content: state.tag, type: 'session' })
                    setStore({ name: 'tagList', content: state.tagList, type: 'session' })
                }
            })

        },
        DEL_TAG: (state, action) => {
            state.tagList.forEach((ele, num) => {
                if (ele.value === action.value) {
                    state.tagList.splice(num, 1)
                    state.tagList = setFistTag(state.tagList);
                    setStore({ name: 'tag', content: state.tag, type: 'session' })
                    setStore({ name: 'tagList', content: state.tagList, type: 'session' })
                }
            })
        },
    }
}