package hengda.pitchfork

import com.google.gson.Gson
import io.grpc.stub.StreamObserver
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class CheLiang004ServiceImpl: CheLiang004Grpc.CheLiang004ImplBase() {
    private val logger: Logger = LoggerFactory.getLogger(CheLiang004ServiceImpl::class.java)

    override fun list(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                select *
                from cheliangduan.yitihuazuoye
                limit 200
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun save(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                insert into
                    cheliangduan.yitihuazuoye (
                        dept, leader, leader_phone, operator, operator_phone,
                        train, date_begin, time_begin, date_end, time_end,
                        title, content,
                        p_yq_xdc, p_yq_jcw, p_yq_zydd, p_yq_qt,
                        category
                    )
                    values (
                        ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?,
                        ?, ?,
                        ?, ?, ?, ?,
                        ?
                    )
                returning id
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["dept"].toString())
            ps.setString(3, body["leader_phone"].toString())
            ps.setString(4, body["operator"].toString())
            ps.setString(5, body["operator_phone"].toString())
            ps.setString(6, body["train"].toString())
            ps.setString(2, body["leader"].toString())
            ps.setString(7, body["date_begin"].toString())
            ps.setString(8, body["time_begin"].toString())
            ps.setString(9, body["date_end"].toString())
            ps.setString(10, body["time_end"].toString())
            ps.setString(11, body["title"].toString())
            ps.setString(12, body["content"].toString())
            ps.setString(13, body["p_yq_xdc"].toString())
            ps.setString(14, body["p_yq_jcw"].toString())
            ps.setString(15, body["p_yq_zydd"].toString())
            ps.setString(16, body["p_yq_qt"].toString())
            ps.setString(17, body["category"].toString())
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getMap(rs))
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun remove(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                delete from cheliangduan.yitihuazuoye where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            ps.execute()
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }
}
