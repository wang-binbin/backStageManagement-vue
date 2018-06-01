<template>
    <div id="components-layout-demo-side"> 
        <v-layout>
            <v-sider collapsible v-model="collapsed">
                <div class="logo"></div>
                <v-menu theme="dark" :mode="collapsed?'vertical':'inline'" :data="menuData3">
                    <template slot-scope="{data}" >
                        <i v-if="data.icon" :class="'anticon anticon-' + data.icon" ></i>
                        <span :class="{'nav-text':data.icon}" @click="abb">{{data.name}}</span>
                    </template>
                    <template slot-scope="{data}" slot="sub">
                        <i v-if="data.icon" :class="'anticon anticon-' + data.icon" ></i>
                        <span class="nav-text">{{data.name}}</span>
                    </template>
                </v-menu>
            </v-sider>
            <v-layout>
                <v-content :style="{}">

                    <div style="background: #fff; min-height: 360px;">Content</div>
                </v-content>
            </v-layout>
        </v-layout>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                collapsed: true,
                menuData3: [{
                    name: 'User',
                    icon: 'user',
                    children: [{
                        name: 'Tome',
                       
                    },{
                        name: 'Bill'
                    },{
                        name: 'Alex'
                    }]
                },{
                    name: 'Team',
                    icon: 'team',
                    children: [{
                        name: 'Team1'
                    },{
                        name: 'Team2'
                    }]
                },{
                    name: 'File',
                    icon: 'file',
                    selected: true
                }]
            }
        },
     methods: {
			abb:function() {
				alert("s")},
        },
        watch: {
            collapsed(val) {
//              console.log(val);
            },
        },
    }
</script>
<style>
    #components-layout-demo-side .logo {
        height: 32px;
        background: #333;
        border-radius: 6px;
        margin: 16px;
    }
    #components-layout-demo-side .ant-layout-sider-collapsed .anticon {
        font-size: 16px;
        margin-left: 8px;
    }
    #components-layout-demo-side .ant-layout-sider-collapsed .nav-text {
        display: none;
    }
    #components-layout-demo-side .ant-layout-sider-collapsed .ant-menu-submenu-vertical > .ant-menu-submenu-title:after {
        display: none;
    }
</style>
