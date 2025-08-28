<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <u-icon name="arrow-left" @click="goHome" />
      <text>审批管理</text>
      <u-icon name="history" @click="showApprovalHistory" />
    </view>

    <scroll-view class="content">
      <!-- 筛选栏 -->
      <view class="filter-bar">
        <view
          v-for="option in filterOptions"
          :key="option.value"
          class="filter-btn"
          :class="{ active: currentFilter === option.value }"
          @click="setApprovalFilter(option.value)"
        >
          {{ option.label }}
        </view>
      </view>

      <!-- 审批列表 -->
      <view class="approval-list">
        <u-card
          v-for="item in filteredApprovals"
          :key="item.id"
          class="approval-item"
        >
          <view class="item-info">
            <text>{{ item.title }}</text>
            <text>{{ item.time }}</text>
          </view>
          <view
            class="item-status"
            :class="{
              'status-pending': item.status === 'pending',
              'status-approved': item.status === 'approved'
            }"
          >
            {{ item.statusText }}
          </view>
        </u-card>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentFilter = ref('pending')

const filterOptions = [
  { label: '待我审批', value: 'pending' },
  { label: '我已审批', value: 'approved' },
  { label: '全部审批', value: 'all' }
]

// 模拟审批数据
const approvals = ref([
  { id: 1, title: '财务室钥匙申请 - 李四', time: '2023-06-17 09:15', status: 'pending', statusText: '待审批' },
  { id: 2, title: '仓库钥匙申请 - 王五', time: '2023-06-17 10:40', status: 'pending', statusText: '待审批' },
  { id: 3, title: '会议室钥匙申请 - 张三', time: '2023-06-16 15:30', status: 'approved', statusText: '已审批' }
])

const filteredApprovals = computed(() => {
  if (currentFilter.value === 'all') return approvals.value
  return approvals.value.filter(a => a.status === currentFilter.value)
})

// 方法
function goHome() {
  uni.switchTab({ url: '/pages/home/HomePage' })
}

function showApprovalHistory() {
  console.log('查看审批历史')
}

function setApprovalFilter(value: string) {
  currentFilter.value = value
}
</script>

<style scoped>
.content { margin-top: 10px; }
.filter-bar { display: flex; margin-bottom: 10px; }
.filter-btn { padding: 5px 10px; margin-right: 5px; border-radius: 4px; background: #f5f5f5; }
.filter-btn.active { background: #007aff; color: #fff; }
.approval-item { display: flex; justify-content: space-between; padding: 10px; margin-bottom: 5px; }
.status-pending { color: #ff9800; }
.status-approved { color: #4caf50; }
</style>
