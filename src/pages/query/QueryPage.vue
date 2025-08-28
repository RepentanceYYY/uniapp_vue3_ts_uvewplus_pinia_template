<template>
  <view class="page">
    <view class="header">
      <u-icon name="user" @click="goHome" />
      <text>钥匙查询</text>
      <u-icon name="bell" @click="toggleFilter" />
    </view>

    <scroll-view class="content">
      <!-- 搜索框 -->
      <u-input
        v-model="searchKeyword"
        placeholder="输入钥匙编号或用途"
        clearable
        shape="round"
        class="search-box"
        prefix-icon="search"
      />

      <!-- 筛选栏 -->
      <view class="filter-bar" v-show="filterVisible">
        <view
          v-for="option in filterOptions"
          :key="option.value"
          class="filter-btn"
          :class="{ active: currentFilter === option.value }"
          @click="setKeyFilter(option.value)"
        >
          {{ option.label }}
        </view>
      </view>

      <!-- 钥匙列表 -->
      <view class="key-list">
        <view
          class="key-item"
          v-for="key in filteredKeys"
          :key="key.id"
        >
          <text class="key-name">{{ key.name }}</text>
          <text class="key-status">{{ key.statusText }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchKeyword = ref('')
const filterVisible = ref(false)
const currentFilter = ref('all')

// 筛选按钮
const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '可用', value: 'available' },
  { label: '已借出', value: 'occupied' },
  { label: '待维修', value: 'maintenance' }
]

// 模拟钥匙数据
const keys = ref([
  { id: 1, name: '钥匙A', status: 'available', statusText: '可用' },
  { id: 2, name: '钥匙B', status: 'occupied', statusText: '已借出' },
  { id: 3, name: '钥匙C', status: 'maintenance', statusText: '待维修' },
  { id: 4, name: '钥匙D', status: 'available', statusText: '可用' }
])

// 计算过滤后的钥匙列表
const filteredKeys = computed(() => {
  return keys.value.filter(k => 
    (currentFilter.value === 'all' || k.status === currentFilter.value) &&
    k.name.includes(searchKeyword.value)
  )
})

// 方法
function goHome() {
  console.log('返回首页')
  uni.switchTab({ url: '/pages/home/HomePage' })
}

function toggleFilter() {
  filterVisible.value = !filterVisible.value
}

function setKeyFilter(value: string) {
  currentFilter.value = value
}
</script>

<style scoped>








</style>
