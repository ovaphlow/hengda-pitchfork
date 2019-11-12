package hengda.pitchfork

import com.google.gson.Gson
import io.grpc.stub.StreamObserver
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class TrainServiceImpl: TrainGrpc.TrainImplBase() {
    private val logger: Logger = LoggerFactory.getLogger(TrainServiceImpl::class.java);

    override fun list(req: TrainRequest, responseObserver: StreamObserver<TrainReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            var sql: String = """
                select * from public.common_data order by id desc limit 200
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            var rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = TrainReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }
}