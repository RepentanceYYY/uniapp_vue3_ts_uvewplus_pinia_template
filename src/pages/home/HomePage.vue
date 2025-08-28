<template>
  <view class="page" id="homePage">
    <!-- 顶部 header -->
    <view class="header">
      <u-icon name="user" @click="showUserMenu" />
      <text>智能钥匙管理</text>
      <u-icon name="bell" @click="showNotifications" />
    </view>
    
    <!-- 内容滚动区域 -->
  <scroll-view scroll-y style="height: 100vh;">
    <view class="content">
      <!-- 统计卡片 -->
       <view class="stats-container">
      <view class="stat-card slide-in" style="animation-delay:0.1s;">
        <text class="stat-value">28</text>
        <text class="stat-label">可用钥匙</text>
      </view>
      <view class="stat-card slide-in" style="animation-delay:0.2s;">
        <text class="stat-value">5</text>
        <text class="stat-label">待审批</text>
      </view>
      <view class="stat-card slide-in" style="animation-delay:0.3s;">
        <text class="stat-value">42</text>
        <text class="stat-label">今日使用</text>
      </view>
      <view class="stat-card slide-in" style="animation-delay:0.4s;">
        <text class="stat-value">3</text>
        <text class="stat-label">需归还</text>
      </view>
    </view>

      <!-- 我的钥匙柜 -->
      <view class="card slide-in" style="animation-delay:0.5s;">
        <view class="card-header">
          <text class="card-title">我的钥匙柜权限</text>
          <text class="card-more" @click="showAllCabinets">全部</text>
        </view>
        <view class="cabinet-list">
          <view class="cabinet-item" @click="() => showCabinetDetails(1)">
            <u-icon name="key" class="cabinet-icon" />
            <text class="cabinet-name">一号钥匙柜</text>
            <text class="cabinet-info">12把钥匙 · 5可用</text>
          </view>
          <view class="cabinet-item" @click="() => showCabinetDetails(2)">
            <u-icon name="key" class="cabinet-icon" />
            <text class="cabinet-name">二号钥匙柜</text>
            <text class="cabinet-info">8把钥匙 · 3可用</text>
          </view>
        </view>
      </view>

      <!-- 我的申请 -->
      <view class="card slide-in" style="animation-delay:0.6s;">
        <view class="card-header">
          <text class="card-title">我的申请</text>
          <text class="card-more" @click="showAllApplications">全部</text>
        </view>
        <view class="application-list">
          <view class="list-item" @click="() => showApplicationDetail(1)">
            <view class="item-info">
              <text class="item-title">机房钥匙申请</text>
              <text class="item-date">2023-06-15 10:30</text>
            </view>
            <text class="item-status status-approved">已批准</text>
          </view>
          <view class="list-item" @click="() => showApplicationDetail(2)">
            <view class="item-info">
              <text class="item-title">档案室钥匙申请</text>
              <text class="item-date">2023-06-16 14:20</text>
            </view>
            <text class="item-status status-pending">审批中</text>
          </view>
        </view>
      </view>

      <!-- 待我审批 -->
      <view class="card slide-in" style="animation-delay:0.7s;">
        <view class="card-header">
          <text class="card-title">待我审批</text>
          <text class="card-more" @click="showAllApprovals">全部</text>
        </view>
        <view class="application-list">
          <view class="list-item" @click="() => showApprovalDetail(3)">
            <view class="item-info">
              <text class="item-title">财务室钥匙申请 - 李四</text>
              <text class="item-date">2023-06-17 09:15</text>
            </view>
            <text class="item-status status-pending">待审批</text>
          </view>
          <view class="list-item" @click="() => showApprovalDetail(4)">
            <view class="item-info">
              <text class="item-title">仓库钥匙申请 - 王五</text>
              <text class="item-date">2023-06-17 10:40</text>
            </view>
            <text class="item-status status-pending">待审批</text>
          </view>
        </view>
      </view>
    </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/static/css/homepage.css'


interface Stat {
  icon: string
  value: number
  label: string
}

interface Cabinet {
  id: number
  name: string
  totalKeys: number
  availableKeys: number
}

interface Application {
  id: number
  title: string
  time: string
  status: 'approved' | 'pending' | 'rejected'
  statusText: string
}

interface Approval {
  id: number
  title: string
  user: string
  time: string
}

const stats = ref<Stat[]>([
  { icon: 'key', value: 28, label: '可用钥匙' },
  { icon: 'clock', value: 5, label: '待审批' },
  { icon: 'history', value: 42, label: '今日使用' },
  { icon: 'warning', value: 3, label: '需归还' }
])

const cabinets = ref<Cabinet[]>([
  { id: 1, name: '一号钥匙柜', totalKeys: 12, availableKeys: 5 },
  { id: 2, name: '二号钥匙柜', totalKeys: 8, availableKeys: 3 }
])

const myApplications = ref<Application[]>([
  { id: 1, title: '机房钥匙申请', time: '2023-06-15 10:30', status: 'approved', statusText: '已批准' },
  { id: 2, title: '档案室钥匙申请', time: '2023-06-16 14:20', status: 'pending', statusText: '审批中' }
])

const pendingApprovals = ref<Approval[]>([
  { id: 3, title: '财务室钥匙申请', user: '李四', time: '2023-06-17 09:15' },
  { id: 4, title: '仓库钥匙申请', user: '王五', time: '2023-06-17 10:40' }
])

// 方法
function showUserMenu() {
  console.log('显示用户菜单')
}

function showNotifications() {
  console.log('显示通知')
}

function showAllCabinets() {
  console.log('显示全部钥匙柜')
}

function showCabinetDetails(id: number) {
  console.log('显示钥匙柜详情', id)
}

function showAllApplications() {
  console.log('显示全部申请')
}

function showApplicationDetail(id: number) {
  console.log('显示申请详情', id)
}

function showAllApprovals() {
  console.log('显示全部待审批')
}

function showApprovalDetail(id: number) {
  console.log('显示审批详情', id)
}

function statusClass(status: string) {
  if (status === 'approved') return 'status-approved'
  if (status === 'pending') return 'status-pending'
  if (status === 'rejected') return 'status-rejected'
  return ''
}
</script>

<style scoped>




/* 页面内容 */


/* 统计卡片 - 单列布局 */
.stats-container {
  display: grid;
  grid-template-columns: 1fr; /* 单列布局，一行一张卡片 */
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.3s ease forwards;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
}

/* 卡片通用样式 */
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  animation: slideIn 0.3s ease forwards;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.card-more {
  color: #3498db;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

/* 钥匙柜列表 */
.cabinet-list {
  display: grid;
  grid-template-columns: 1fr; /* 单列布局，和统计卡片一致 */
  gap: 15px;
}

.cabinet-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  overflow: hidden;
}

.cabinet-name {
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
}

.cabinet-icon {
  font-size: 24px;
  color: #3498db;
  margin-bottom: 8px;
}

.cabinet-info {
  font-size: 12px;
  color: #7f8c8d;
}

/* 申请列表 */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: background 0.2s;
}

.list-item:hover {
  background: #e8f4fc;
}

.item-info .item-title {
  font-size: 14px;
  margin-bottom: 5px;
  color: var(--dark, #2c3e50);
}

.item-info .item-date {
  font-size: 12px;
  color: var(--gray, #7f8c8d);
}

.item-status {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

/* 状态颜色 */
.status-approved {
  background: #d4f8d4;
  color: #27ae60;
}

.status-pending {
  background: #fcf3d4;
  color: #f39c12;
}

.status-rejected {
  background: #f8d4d4;
  color: #e74c3c;
}

/* slide-in 动画 */
@keyframes slideIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}



</style>
