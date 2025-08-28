<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <u-icon name="arrow-left" @click="goHome" />
      <text>使用记录</text>
      <u-icon name="download" @click="exportRecords" />
    </view>

    <scroll-view class="content">
      <!-- 筛选栏 -->
      <view class="filter-bar">
        <view
          v-for="option in filterOptions"
          :key="option.value"
          class="filter-btn"
          :class="{ active: currentFilter === option.value }"
          @click="setRecordFilter(option.value)"
        >
          {{ option.label }}
        </view>
      </view>

      <!-- 记录列表 -->
      <view class="record-list">
        <u-card
          v-for="item in filteredRecords"
          :key="item.id"
          class="record-item"
        >
          <view class="item-info">
            <text>{{ item.title }}</text>
            <text>{{ item.time }}</text>
          </view>
          <view class="item-type">
            {{ item.typeText }}
          </view>
        </u-card>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentFilter = ref('all')

const filterOptions = [
  { label: '全部记录', value: 'all' },
  { label: '领用记录', value: 'borrow' },
  { label: '归还记录', value: 'return' },
  { label: '申请记录', value: 'apply' }
]

// 模拟记录数据
const records = ref([
  { id: 1, title: '财务室钥匙领用 - 李四', time: '2023-06-17 09:15', type: 'borrow', typeText: '领用' },
  { id: 2, title: '仓库钥匙归还 - 王五', time: '2023-06-17 10:40', type: 'return', typeText: '归还' },
  { id: 3, title: '机房钥匙申请 - 张三', time: '2023-06-16 15:30', type: 'apply', typeText: '申请' }
])

const filteredRecords = computed(() => {
  if (currentFilter.value === 'all') return records.value
  return records.value.filter(r => r.type === currentFilter.value)
})

// 方法
function goHome() {
  uni.switchTab({ url: '/pages/home/HomePage' })
}

function exportRecords() {
  console.log('导出记录')
}

function setRecordFilter(value: string) {
  currentFilter.value = value
}
</script>

<style scoped>
.content { margin-top: 10px; }
.filter-bar { display: flex; margin-bottom: 10px; }
.filter-btn { padding: 5px 10px; margin-right: 5px; border-radius: 4px; background: #f5f5f5; }
.filter-btn.active { background: #007aff; color: #fff; }
.record-item { display: flex; justify-content: space-between; padding: 10px; margin-bottom: 5px; }
</style>
