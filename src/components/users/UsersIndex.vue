<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

	  <el-table :data="users" stripe style="width: 100%" :default-sort = "{prop: 'id', order: 'ascending'}" v-loading="listLoading" @selection-change="selsChange">
	  	<el-table-column type="selection" width="55"></el-table-column>
	    <el-table-column fixed prop="id" label="序号" sortable width="100"></el-table-column>
	    <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
	    <el-table-column prop="mobile" label="手机号" :formatter="formatMobile"></el-table-column>
	    <el-table-column prop="sex" label="性别" sortable :formatter="formatSex"></el-table-column>
	    <el-table-column prop="birth" label="出生日期" sortable></el-table-column>
	    <el-table-column label="操作">
	      <template slot-scope="scope">
	        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>

	  <!--工具条-->
	<el-col :span="24" class="toolbar">
		<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
		<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="2" :total="total" style="float:right;">
		</el-pagination>
	</el-col>

	  <!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="2">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="序号">
					<el-input-number v-model="editForm.id" ></el-input-number>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="editForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>


	  <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="2">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="序号">
					<el-input-number v-model="addForm.id" ></el-input-number>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addSubmit" >提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>


<script>
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '@/api/user';

export default {
    data() {
      return {
      	filters: {
			name: ''
		},
        users:[],
        page: 1,
        total: 0,
        listLoading: false,
        sels: [],//列表选中列
        //新增界面数据
        addFormVisible: false,//新增界面是否显示
        addFormRules: {
			name: [
				{ required: true, message: '请输入姓名', trigger: 'blur' }
			]
		},
		addForm: {
			name: '',
			sex: -1,
			id: 0,
			birth: '',
			mobile: ''
		},
		editFormVisible: false,//编辑界面是否显示
		editLoading: false,
		editFormRules: {
			name: [
				{ required: true, message: '请输入姓名', trigger: 'blur' }
			]
		},
		//编辑界面数据
		editForm: {
			name: '',
			sex: -1,
			id: 0,
			birth: '',
			mobile: ''
		},
	}
    },
    methods: {
		formatSex: function (row, column) {
			return row.sex == 1 ? '男' : row.sex == 2 ? '女' : '未知';
		},
		//手机号隐藏
		formatMobile: function(row, column){
			return row.mobile.substr(0,3)+ '****'+ row.mobile.substr(7);
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getUsers();
		},
		getUsers(){
			let para ={
				page:this.page,
				name:this.filters.name
			};
			this.listLoading = true;
			getUserListPage(para).then((res)=>{
				this.total = res.data.total;
				this.users = res.data.users;
				this.listLoading = false;
			});
		},
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
		},
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						addUser(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			this.editFormVisible = true;
			this.editForm = Object.assign({}, row);
		},
		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						editUser(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		//删除
		handleDelete: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;	
				let para = { id: row.id };
				removeUser(para).then((res) => {
					this.listLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		//批量删除
		batchRemove: function () {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				let para = { ids: ids };
				batchRemoveUser(para).then((res) => {
					this.listLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			});
		}
	},
	mounted() {
		this.getUsers();
	}
  }
</script>

<style scoped lang="scss">
  

</style>