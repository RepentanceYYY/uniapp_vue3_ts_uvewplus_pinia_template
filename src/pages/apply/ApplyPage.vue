<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <u-icon name="arrow-left" @click="goHome" />
      <text>钥匙申请</text>
      <u-icon name="history" @click="showApplicationHistory" />
    </view>

    <scroll-view class="content">
      <u-card>
        <!-- 选择钥匙柜 -->
        <view class="form-group">
          <text class="form-label">选择钥匙柜</text>
          <u-picker
            :range="cabinets"
            range-key="name"
            v-model="selectedCabinet"
            @change="loadKeysForApplication"
          />
        </view>

        <!-- 选择钥匙 -->
        <view class="form-group">
          <text class="form-label">选择钥匙（可多选）</text>
          <view v-if="keysForCabinet.length === 0" class="empty-state">
            <u-icon name="key" />
            <text>请先选择钥匙柜</text>
          </view>
          <view v-else class="key-selection">
            <u-checkbox-group v-model="selectedKeys">
              <u-checkbox v-for="key in keysForCabinet" :key="key.id" :name="key.id">
                {{ key.name }}
              </u-checkbox>
            </u-checkbox-group>
          </view>
        </view>

        <!-- 使用事由 -->
        <view class="form-group">
          <text class="form-label">使用事由</text>
          <u-textarea v-model="useReason" placeholder="请详细描述使用钥匙的事由..." />
        </view>

        <!-- 预计使用时间 -->
        <view class="form-group">
          <text class="form-label">预计使用时间</text>
          <u-datetime-picker v-model="useTime" type="datetime" />
        </view>

        <!-- 提交按钮 -->
        <u-button type="primary" @click="submitApplication">
          <u-icon name="paper-plane" /> 提交申请
        </u-button>
      </u-card>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const cabinets = ref([
  { id: 1, name: '一号钥匙柜' },
  { id: 2, name: '二号钥匙柜' }
])

const selectedCabinet = ref(null)
const keysForCabinet = ref([]) // 当前柜子的钥匙列表
const selectedKeys = ref<number[]>([])
const useReason = ref('')
const useTime = ref('')

// 模拟钥匙数据
const allKeys = [
  { id: 1, cabinetId: 1, name: '钥匙A' },
  { id: 2, cabinetId: 1, name: '钥匙B' },
  { id: 3, cabinetId: 2, name: '钥匙C' },
  { id: 4, cabinetId: 2, name: '钥匙D' }
]

// 方法
function goHome() {
  uni.switchTab({ url: '/pages/home/HomePage' })
}

function showApplicationHistory() {
  console.log('查看申请历史')
}

const loadKeysForApplication =()=> {
  keysForCabinet.value = allKeys.filter(k => k.cabinetId === selectedCabinet.value) as any
  selectedKeys.value = []
}

function submitApplication() {
  console.log('提交申请', {
    cabinet: selectedCabinet.value,
    keys: selectedKeys.value,
    reason: useReason.value,
    time: useTime.value
  })
  uni.showToast({ title: '申请提交成功', icon: 'success' })
}
</script>

<style scoped>
</style>
